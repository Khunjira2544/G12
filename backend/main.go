package main

import (
	"github.com/Khunjira2544/sa-65-project/controller"
	"github.com/Khunjira2544/sa-65-project/entity"
	"github.com/Khunjira2544/sa-65-project/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// User Routes   //ของเอา Officer officer
			router.GET("/officers", controller.ListOfficers)
			router.GET("/officer/:id", controller.GetOfficer)
			router.PATCH("/officers", controller.UpdateOfficer)
			router.DELETE("/officers/:id", controller.DeleteOfficer)

			// Resolution Routes   //ของเราคือ collegeyear  Collegeyear
			router.GET("/collegeyear", controller.ListCollegeyears)
			router.GET("/collegeyear/:id", controller.GetCollegeyear)
			router.POST("/collegeyear", controller.CreateCollegeyear)
			router.PATCH("/collegeyear", controller.UpdateCollegeyear)
			router.DELETE("/collegeyear/:id", controller.DeleteCollegeyear)

			// ของเรา faculty Faculty
			router.GET("/facultys", controller.ListFacultys)
			router.GET("/faculty/:id", controller.GetFaculty)
			router.POST("/facultys", controller.CreateFaculty)
			router.PATCH("/facultys", controller.UpdateFaculty)
			router.DELETE("/faculty/:id", controller.DeleteFaculty)

			// Video Routes  //ของเรา teacher  Teacher
			router.GET("/teachers", controller.ListTeachers)
			//router.GET("/faculty/:faculty_id", controller.ListT_Facultys)
			router.GET("/teacher/:id", controller.GetTeacher)
			router.POST("/teachers", controller.CreateTeacher)
			router.PATCH("/teachers", controller.UpdateTeacher)
			router.DELETE("/teachers/:id", controller.DeleteTeacher)

			// WatchVideo Routes   //ของเรา Student student
			router.GET("/students", controller.ListStudent)
			router.GET("/students/:id", controller.GetStudent)
			router.POST("/students", controller.CreateStudent)
			router.PATCH("/students", controller.UpdateStudent)
			router.DELETE("/student/:id", controller.DeleteStudent)

		}
	}

	//bill
	r.GET("/bills", controller.ListBills)
	r.GET("/bill/:bill_id", controller.GetBill)
	r.POST("/bills", controller.CreateBill)
	r.GET("/previous_bill", controller.GetPreviousBill)

	r.GET("/payments", controller.ListPayments)
	r.GET("/payment/:payment_id", controller.GetPayment)
	r.POST("/payments", controller.CreatePayment)
	//billสุดแค่ตรงนี้

	//Subject
	// Time Routes
	router.GET("/times", controller.ListTimes) // ("path", cotroller)
	router.GET("/time/:id", controller.GetTime)
	router.POST("/times", controller.CreateTime)
	router.PATCH("/times", controller.UpdateTime)
	router.DELETE("/times/:id", controller.DeleteTime)
	// Subject Routes
	router.GET("/subjects", controller.ListSubject) // ("path", cotroller)
	router.GET("/subject/:id", controller.GetSubject)
	router.POST("/subjects", controller.CreateSubject)
	router.PATCH("/subjects", controller.UpdateSubject)
	router.DELETE("/subjects/:id", controller.DeleteSubject)
	//Subjectสุดแค่นี้

	//Teacher ของเพื่อน
	//education
	r.GET("/educationnals", controller.ListEducational)
	r.GET("/educationnals/:id", controller.GetEducational)
	r.POST("/educationnals", controller.CreateEducational)
	r.PATCH("/educationnals", controller.UpdateEducational)
	r.DELETE("/educationnals/:id", controller.DeleteEducational)

	//Prefix
	r.GET("/prefixes", controller.ListPrefix)
	r.GET("/prefixes/:id", controller.GetPrefix)
	r.POST("/prefixes", controller.CreatePrefix)
	r.PATCH("/prefixes", controller.UpdatePrefix)
	r.DELETE("/prefixes/:id", controller.DeletePrefix)
	//Teacher ของเพื่อน สุดแคนี้

	// Signup User Route
	r.POST("/signup", controller.CreateOfficer)
	// login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
