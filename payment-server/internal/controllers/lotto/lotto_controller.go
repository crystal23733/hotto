package controllers

import (
	"net/http"
	usecase "payment-server/internal/usecase/lotto"

	"github.com/labstack/echo/v4"
)

// LottoController 로또 컨트롤러 구조체
type LottoController struct {
	lottoUsecase usecase.LottoUsecase
}

// NewLottoController LottoController 생성자
func NewLottoController(lu usecase.LottoUsecase) *LottoController {
	return &LottoController{
		lottoUsecase: lu,
	}
}

// GetLatestLottoData 최신 로또 데이터 조회 핸들러
func (c *LottoController) GetLatestLottoData(ctx echo.Context) error {
	data, err := c.lottoUsecase.GetLatestLottoData()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"message": "최신 로또 데이터 조회 중 오류가 발생했습니다: " + err.Error(),
		})
	}
	return ctx.JSON(http.StatusOK, data)
}

// GetLottoDataForRound 특정 회차 로또 데이터 조회 핸들러
func (c *LottoController) GetLottoDataForRound(ctx echo.Context) error {
	round := ctx.Param("round")
	data, err := c.lottoUsecase.GetLottoDataForRound(round)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{
			"message": "로또 데이터 조회 중 오류가 발생했습니다: " + err.Error(),
		})
	}
	return ctx.JSON(http.StatusOK, data)
}
