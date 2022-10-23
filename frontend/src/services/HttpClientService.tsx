import React from "react";
//import { SigninInterface } from "../models/ISignin";
import { OfficersInterface } from "../models/IOfficer";
import { SigninInterface } from "../models/ISignin";
import { StudentInterface } from "../models/IStudent";
import { SubjectsInterface } from "../models/ISubject";
import { TeachersInterface } from "../models/ITeacher";

const apiUrl = "http://localhost:8080";

async function Login(data: SigninInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/login`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("uid", res.data.id);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetStudent() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/students`, requestOptions) //////////
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetOfficers() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/officers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetTeachers() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/teachers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetFaculty() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/facultys`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetCollegeyear() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/collegeyear`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetOfficerByUID() {
    let uid = localStorage.getItem("uid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/officer/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function CreateOfficer(data: OfficersInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/officers/create`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function Student(data: StudentInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/students`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//วิชา
async function GetSubjects() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/subjects`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetTime() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/times`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}


async function Subjects(data: SubjectsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/subjects`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//T
async function GetOnlyOfficer() {
    const uid = localStorage.getItem("uid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };
  
    let res = await fetch(`${apiUrl}/officers/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });
  
    return res;
  }
  
  async function GetEducational() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };
  
    let res = await fetch(`${apiUrl}/educationnals`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });
  
    return res;
  }
  
  async function GetPrefix() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };
  
    let res = await fetch(`${apiUrl}/prefixes`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });
  
    return res;
  }
  
  async function CreateTeacher(data: TeachersInterface) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/teachers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

export {
    Login,
    GetOfficers,
    GetTeachers,
    GetStudent,
    GetFaculty,
    GetCollegeyear,
    CreateOfficer,
    Student,
    GetOfficerByUID,

    GetTime,
    Subjects,

    GetOnlyOfficer,
    GetEducational,
    GetPrefix,
    CreateTeacher,
};