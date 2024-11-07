package usecase

import (
	"fmt"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/lotto"
	"sort"
	"strings"

	"math/rand"
)

// LottoUsecase 로또 유즈케이스 인터페이스
type LottoUsecase interface {
	GenerateUniqueNumbers() ([]int, error)
	GetLatestLottoData() (*entity.ILottoRoundData, error)
	GetLottoDataForRound(round string) (*entity.ILottoRoundData, error)
}

type lottoUsecase struct {
	s3Repo lotto.S3Repository
}

// NewLottoUsecase LottoUsecase 생성자
func NewLottoUsecase(s3Repo lotto.S3Repository) LottoUsecase {
	return &lottoUsecase{
		s3Repo: s3Repo,
	}
}

// GenerateUniqueNumbers 고유한 로또 번호 생성
func (u *lottoUsecase) GenerateUniqueNumbers() ([]int, error) {
	history, err := u.s3Repo.GetCachedHistory()
	if err != nil {
		return nil, fmt.Errorf("히스토리 조회 중 오류 발생: %v", err)
	}

	var numbers []int
	for {
		numbers = generateRandomNumbers()
		numbersStr := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(numbers)), ","), "[]")
		if !history[numbersStr] {
			break
		}
	}
	return numbers, nil
}

// GetLatestLottoData 최신 로또 데이터 조회
func (u *lottoUsecase) GetLatestLottoData() (*entity.ILottoRoundData, error) {
	return u.s3Repo.GetLatestLottoData()
}

// GetLottoDataForRound 특정 회차 로또 데이터 조회
func (u *lottoUsecase) GetLottoDataForRound(round string) (*entity.ILottoRoundData, error) {
	return u.s3Repo.GetLottoDataForRound(round)
}

// generateRandomNumbers 무작위 번호 생성 헬퍼 함수
func generateRandomNumbers() []int {
	numbers := make([]int, 45)
	for i := range numbers {
		numbers[i] = i + 1
	}

	result := make([]int, 6)
	for i := range result {
		j := rand.Intn(len(numbers))
		result[i] = numbers[j]
		numbers[j] = numbers[len(numbers)-1]
		numbers = numbers[:len(numbers)-1]
	}

	sort.Ints(result)
	return result
}
