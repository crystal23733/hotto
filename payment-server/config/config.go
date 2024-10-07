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
	clientURL := os.Getenv("CLIENT_URL")
	log.Printf("ClientURL: %s", clientURL)
	return clientURL
}

// DBURL은 환경변수에서 DBURL을 반환한다.
func DBURL() string {
	dbURL := os.Getenv("DB_URL")
	log.Printf("DB_URL: %s", dbURL)
	return dbURL
}

// DBName은 환경변수에서 DBName을 반환한다.
func DBName() string {
	dbName := os.Getenv("DB_NAME")
	log.Printf("DB_NAME: %s", dbName)
	return dbName
}

// Cid은 환경변수에서 Cid를 반환한다.
func Cid() string {
	return os.Getenv("CID")
}
