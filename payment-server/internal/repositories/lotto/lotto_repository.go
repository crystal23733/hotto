package lotto

import (
	"context"
	"encoding/json"
	"fmt"
	"payment-server/internal/entity"
	"sync"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// S3Repository S3 저장소 인터페이스
type S3Repository interface {
	GetCachedHistory() (map[string]bool, error)
	GetLatestLottoData() (*entity.ILottoRoundData, error)
	GetLottoDataForRound(round string) (*entity.ILottoRoundData, error)
}

// s3Repository S3 저장소 구현체
type s3Repository struct {
	client      *s3.Client
	bucketName  string
	prefix      string
	memoryCache map[string]bool
	latestData  *entity.ILottoRoundData
	mutex       sync.RWMutex
	initialized bool
}

// NewS3Repository S3Repository 생성자
func NewS3Repository(bucketName, prefix string) (S3Repository, error) {
	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		return nil, fmt.Errorf("S3 설정을 불러오는데 실패했습니다: %v", err)
	}

	client := s3.NewFromConfig(cfg)
	repo := &s3Repository{
		client:      client,
		bucketName:  bucketName,
		prefix:      prefix,
		memoryCache: make(map[string]bool),
	}

	// 백그라운드에서 캐시 초기화 시작
	go repo.initializeCache()

	return repo, nil
}

// initializeCache 캐시 초기화 함수
func (r *s3Repository) initializeCache() {
	ctx := context.Background()
	input := &s3.ListObjectsV2Input{
		Bucket: &r.bucketName,
		Prefix: &r.prefix,
	}

	// 페이지네이션을 통해 모든 객체 처리
	paginator := s3.NewListObjectsV2Paginator(r.client, input)
	newCache := make(map[string]bool)

	for paginator.HasMorePages() {
		page, err := paginator.NextPage(ctx)
		if err != nil {
			fmt.Printf("캐시 초기화 중 오류 발생: %v\n", err)
			return
		}

		for _, obj := range page.Contents {
			data, err := r.readJSONFromS3(*obj.Key)
			if err != nil {
				continue
			}

			numbers := fmt.Sprintf("%d,%d,%d,%d,%d,%d",
				data.DrwtNo1,
				data.DrwtNo2,
				data.DrwtNo3,
				data.DrwtNo4,
				data.DrwtNo5,
				data.DrwtNo6,
			)
			newCache[numbers] = true

			// 최신 데이터 업데이트
			r.mutex.Lock()
			if r.latestData == nil || data.DrwNo > r.latestData.DrwNo {
				r.latestData = data
			}
			r.mutex.Unlock()
		}
	}

	r.mutex.Lock()
	r.memoryCache = newCache
	r.initialized = true
	r.mutex.Unlock()
}

// GetCachedHistory 캐시된 히스토리 조회
func (r *s3Repository) GetCachedHistory() (map[string]bool, error) {
	// 캐시가 초기화될 때까지 대기 (최대 30초)
	timeout := time.After(30 * time.Second)
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			r.mutex.RLock()
			if r.initialized {
				result := r.memoryCache
				r.mutex.RUnlock()
				return result, nil
			}
			r.mutex.RUnlock()
		case <-timeout:
			return nil, fmt.Errorf("캐시 초기화 시간이 초과되었습니다")
		}
	}
}

// GetLatestLottoData 최신 로또 데이터 조회
func (r *s3Repository) GetLatestLottoData() (*entity.ILottoRoundData, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	if !r.initialized {
		return nil, fmt.Errorf("캐시가 아직 초기화되지 않았습니다")
	}

	if r.latestData == nil {
		return nil, fmt.Errorf("최신 로또 데이터를 찾을 수 없습니다")
	}

	return r.latestData, nil
}

// GetLottoDataForRound 특정 회차 로또 데이터 조회
func (r *s3Repository) GetLottoDataForRound(round string) (*entity.ILottoRoundData, error) {
	key := fmt.Sprintf("%s/history%s.json", r.prefix, round)
	fmt.Printf("Requesting S3 key: %s\n", key)
	return r.readJSONFromS3(key)
}

// readJSONFromS3 S3에서 JSON 데이터 읽기
func (r *s3Repository) readJSONFromS3(key string) (*entity.ILottoRoundData, error) {
	ctx := context.Background()
	result, err := r.client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: &r.bucketName,
		Key:    &key,
	})
	if err != nil {
		return nil, fmt.Errorf("S3에서 데이터를 읽는데 실패했습니다: %v", err)
	}
	defer result.Body.Close()

	var data entity.ILottoRoundData
	if err := json.NewDecoder(result.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("JSON 디코딩에 실패했습니다: %v", err)
	}

	return &data, nil
}
