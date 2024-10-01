package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv는 .env파일을 로드한다.
func LoadEnv() error {
	err := godotenv.Load()
	if err != nil {
		log.Printf("환경변수 파일을 찾을 수 없습니다.")
		return err
	}
	return nil
}

// Port는 환경변수에서 Port를 반환하거나 기본값을 반환한다.
func Port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	return port
}

// ClientURL은 환경변수에서 ClientURL을 반환한다.
func ClientURL() string {
	return os.Getenv("CLIENT_URL")
}

// DBURL은 환경변수에서 DBURL을 반환한다.
func DBURL() string {
	return os.Getenv("DB_URL")
}

// DBName은 환경변수에서 DBName을 반환한다.
func DBName() string {
	return os.Getenv("DB_NAME")
}
