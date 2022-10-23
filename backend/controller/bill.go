package controller

import (
	"github.com/Khunjira2544/sa-65-project/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

func CreateBill(c *gin.Context) {

	var bill entity.Bill

	//เพิ่ม
	var payment entity.Payment

	if err := c.ShouldBindJSON(&bill); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	//เพิ่ม
	if tx := entity.DB().Where("payment_id = ?", bill.Payment_ID).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment type not found"})
		return
	}
	//เพิ่ม

	if err := entity.DB().Create(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /user/:id

func GetBill(c *gin.Context) {

	var bill entity.Bill

	id := c.Param("bill_id")

	if err := entity.DB().Raw("SELECT * FROM bills WHERE bill_id = ?", id).Scan(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /users

// GET /users

func ListBills(c *gin.Context) {

	var bills []entity.Bill

	if err := entity.DB().Raw("SELECT * FROM bills").Scan(&bills).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bills})

}

// Get previous bill id
// GET /previous_bill
func GetPreviousBill(c *gin.Context) {
	var bill entity.Bill
	if err := entity.DB().Last(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

//var student entity.Student
//var registration entity.Registration
//var financial entity.Financial
//var payment entity.Payment

//ขั้นตอนที่12
//if err := c.ShouldBindJSON(&bill); err != nil {
//	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//	return
//}

//ขั้นตอนที่ 8 ค้นหา student ด้วย id
//if tx := entity.DB().Where("id = ?", bill.StudentID).First(&student); tx.RowsAffected == 0 {
//	c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
//	return
//}

//ขั้นตอนที่ 13 ค้นหา registration ด้วย id
//if tx := entity.DB().Where("id = ?", w.ResolutionID).First(&resolution); tx.RowsAffected == 0 {
//	c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
//	return
//}




