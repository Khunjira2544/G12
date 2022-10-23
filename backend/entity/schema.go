package entity

import (
	//"time"

	"gorm.io/gorm"
)

type Officer struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string `json:"-"`
	//ผู้ดูแลระบบ 1 คน สามารถบันทึกข้อมูลนักศึกษาได้หลายคน
	Students []Student `gorm:"foreignKey:OfficerID"`
}

type Faculty struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สำนักวิชา มีนักศึกษาหลายคน
	Students []Student `gorm:"foreignKey:FacultyID"`
	//1 สำนักวิชา มีอาจารย์หลายท่าน
	Teacher []Teacher `gorm:"foreignKey:FacultyID"`
}

type Collegeyear struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 ชั้นปี มีนักศึกษาหลายคน
	Students []Student `gorm:"foreignKey:CollegeyearID"`
}

// type Teacher struct {
// 	gorm.Model
// 	Name string `gorm:"uniqueIndex"`
// 	//Email string `gorm:"uniqueIndex"`
// 	// TeacherID ทำหน้าที่เป็น FK
// 	FacultyID *uint
// 	// เป็นข้อมูล user เมื่อ join ตาราง
// 	Faculty Faculty `gorm:"references:id"`
// 	//อาจารย์1คน มีนักศึกษาหลายคน
// 	Students []Student `gorm:"foreignKey:TeacherID"`
// }

type Student struct {
	gorm.Model
	S_ID          string
	Name          string
	Gpax          float32
	Date_of_birth string
	Phone         string
	Parent        string
	Password      string

	OfficerID *uint
	Officer   Officer `gorm:"references:id"`

	CollegeyearID *uint
	Collegeyear   Collegeyear `gorm:"references:id"`

	FacultyID *uint
	Faculty   Faculty `gorm:"references:id"`

	TeacherID *uint
	Teacher   Teacher `gorm:"references:id"`
}

// bill
type Payment struct {
	Payment_ID    string `gorm:"primaryKey"`
	Name          string
	Accountnumber string `gorm:"uniqueIndex"`
	Bills         []Bill `gorm:"foreignKey:Payment_ID"`
}

type Bill struct {
	Bill_ID             uint `gorm:"primaryKey"`
	Datetimepay         string
	Bill_StudentID      string
	Bill_RegistrationID string

	//FK
	Payment_ID *string //ไม่ใช้ มันบัค`gorm:"references:payment_id"`
	Payment    Payment

	Bill_OfficerID string
	Total          uint
}

// Subject
type Time struct {
	gorm.Model
	Period string

	Subject []Subject `gorm:"foreignKey:TimeID"`
}

type Subject struct {
	gorm.Model
	Code    string
	Name    string
	Credit  uint
	Section uint
	Day     string
	Take    uint

	TeacherID *uint
	Teacher   Teacher

	FacultyID *uint
	Faculty   Faculty

	OfficerID *uint
	Officer   Officer

	TimeID *uint
	Time   Time
}

// Teacher
type Prefix struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Teacher []Teacher `gorm:"ForeignKey:PrefixID"`
}

type Educational struct {
	gorm.Model
	Name    string    `gorm:"uniqueIndex"`
	Teacher []Teacher `gorm:"ForeignKey:EducationalID"`
}

// Teacher ของเพื่อน
type Teacher struct {
	gorm.Model
	Name          string
	Email         string `gorm:"uniqueIndex"`
	Password      string
	OfficerID     *uint
	Officer       Officer
	FacultyID     *uint
	Faculty       Faculty
	PrefixID      *uint
	Prefix        Prefix
	EducationalID *uint
	Educational   Educational
}

// ประเมิณอาจารย์ ของเพื่อน
type Teaching_duration struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessment []Teacher_assessment `gorm:"foreignKey:Teaching_duration_ID"`
}

type Content_difficulty_level struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessment []Teacher_assessment `gorm:"foreignKey:Content_difficulty_level_ID"`
}

type Content_quality struct {
	gorm.Model
	Description string `gorm:"uniqueIndex"`

	Teacher_assessment []Teacher_assessment `gorm:"foreignKey:Content_quality_ID"`
}

type Teacher_assessment struct {
	gorm.Model
	Comment string

	Student_ID *uint
	Student    Student `gorm:"references:id"`

	Teacher_ID *uint
	Teacher    Teacher `gorm:"references:id"`

	Teaching_duration_ID *uint
	Teaching_duration    Teaching_duration `gorm:"references:id"`

	Content_difficulty_level_ID *uint
	Content_difficulty_level    Content_difficulty_level `gorm:"references:id"`

	Content_quality_ID *uint
	Content_quality    Content_quality `gorm:"references:id"`
}
