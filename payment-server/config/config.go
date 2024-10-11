/*
config 패키지는 애플리케이션의 설정 및 환경 변수를 로드하고
관리하는 기능을 제공합니다.
*/

package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv는 .env파일을 로드한다.
/*
LoadEnv는 프로젝트 루트에 있는 .env 파일을 로드하여
환경 변수를 설정합니다. 파일 로드에 실패하면 오류를 반환합니다.
*/
// LoadEnv 함수는 환경 변수를 로드합니다.
func LoadEnv() error {
	var err error
	env := os.Getenv("NODE_ENV")

	// 개발 환경일 경우 .env.development 파일 로드
	if env == "development" {
		err = godotenv.Load(".env.development")
		if err != nil {
			log.Printf("Warning: .env.development 파일을 로드하지 못했습니다: %v", err)
		}
	} else {
		// 기본 .env 파일 로드
		err = godotenv.Load()
		if err != nil {
			log.Printf("Warning: .env 파일을 로드하지 못했습니다: %v", err)
		}
	}
	return err
}

// Port는 환경변수에서 Port를 반환하거나 기본값을 반환한다.
func Port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	return port
}

// CertPath는 SSL 인증서 경로를 반환한다.
func CertPath() string {
	return os.Getenv("PEM_URL")
}

// KeyPath는 SSL 키 경로를 반환한다.
func KeyPath() string {
	return os.Getenv("PEM_KEY_URL")
}

// ClientURL은 환경변수에서 ClientURL을 반환한다.
func ClientURL() string {
	clientURL := os.Getenv("CLIENT_URL")
	return clientURL
}

// DBURL은 환경변수에서 DBURL을 반환한다.
func DBURL() string {
	dbURL := os.Getenv("DB_URL")
	return dbURL
}

// DBName은 환경변수에서 DBName을 반환한다.
func DBName() string {
	dbName := os.Getenv("DB_NAME")
	return dbName
}

// Cid은 환경변수에서 Cid를 반환한다.
func Cid() string {
	return os.Getenv("CID")
}

// CidSecret은 환경변수에서 CID_SECRET을 반환한다.
func CidSecret() string {
	return os.Getenv("CID_SECRET")
}
