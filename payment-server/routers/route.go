/*
routers 패키지는 애플리케이션의 라우터를 정의하고 핸들러를 연결한다.
*/

package routers

import (
	"payment-server/controllers"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// SetupRoutes는 Echo인스턴스에 라우트를 설정한다.
// 각 라우트 함수는 특정 핸들러와 연결된다.
func SetupRoutes(e *echo.Echo, client *mongo.Client) {
	e.POST("/pay", func(c echo.Context) error {
		return controllers.PayHandler(c, client)
	})

	e.POST("/pay/approval", func(c echo.Context) error {
		return controllers.PayApproveHandler(c, client)
	})
}
