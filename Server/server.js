import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9753944391',
    database: 'rgpvhostel'
})

connection.connect()
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
app.get("/", (req, res) => {
    res.send("qwerty");
})
app.post("/register", (req, res) => {
    console.log(req.body);
    var enrollment = req.body.enrollment;
    var password = req.body.password;
    console.log(enrollment);
    console.log(password);

    connection.query('INSERT INTO studentRegistrationData (enrollment_dte,student_password) VALUE (?,?)', [enrollment, password], (err, rows, fields) => {
        if (err) throw err

        console.log("Data saved successfully");
        res.send("Successfully Registered.")
    })

})
app.post("/loginStudent", (req, res) => {
    console.log(req.body);
    var enrollment = req.body.enrollment;
    var password = req.body.psw;
    console.log(enrollment);
    console.log(password);

    connection.query('select * from studentRegistrationData where enrollment_dte = ? and student_password = ?', [enrollment, password], (err, rows, fields) => {
        if (err) throw err
        if (rows.length > 0) {
            console.log("Login successfully!")
            res.status(200).json({ "msg": "Logged in successfully.", "enrollment": enrollment })
        } else {
            console.log("Authentication Failed!");
            res.status(400).send("Authentication Failed..!")
        }

    })
})
app.post("/loginAdmin", (req, res) => {
    console.log(req.body);
    var adminID = req.body.adminID;
    var adminPassword = req.body.adminPassword
    console.log(adminID);
    console.log(adminPassword);

    connection.query('select * from adminProfile where adminID = ? and adminPassword = ?', [adminID, adminPassword], (err, rows, fields) => {
        if (err) throw err
        if (rows.length > 0) {
            console.log("Login successfully!")
            res.status(200).send({ "msg": "Logged in successfully.", "adminID": adminID })
        } else {
            console.log("Authentication Failed!");
            res.status(400).send("Authentication Failed..!")
        }

    })
})
app.post("/applicationForm", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment_dte;
    var full_name = req.body.full_name;
    var father_name = req.body.father_name;
    var dob = req.body.dob;
    var nationality = req.body.nationality;
    var gender = req.body.gender;
    var mobileno = req.body.mobileno;
    var parentContact = req.body.parentContact;
    var address = req.body.address;
    var city = req.body.city;
    var district = req.body.district;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var category = req.body.category;
    var course = req.body.course;
    var branch = req.body.branch;
    var recentExam = req.body.recentExam;
    var percentage = req.body.percentage;
    var hostelName = req.body.hostelName;
    console.log(enrollment_dte);
    console.log(full_name);
    console.log(father_name);
    console.log(dob);
    console.log(nationality);
    console.log(gender);
    console.log(mobileno);
    console.log(parentContact);
    console.log(address);
    console.log(city);
    console.log(district);
    console.log(state);
    console.log(pincode);
    console.log(category);
    console.log(course);
    console.log(branch);
    console.log(recentExam);
    console.log(percentage);
    console.log(hostelName);
    connection.query('INSERT INTO applicationForm (enrollment_dte,full_name,father_name,dob,nationality,gender,mobile,parentContact,address,city,district,state,pincode,category,course,branch,recentExam,percentage,hostelName) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [enrollment_dte, full_name, father_name, dob, nationality, gender, mobileno, parentContact, address, city, district, state, pincode, category, course, branch, recentExam, percentage, hostelName], (err, rows, fields) => {
        if (err) throw err

        console.log("Data saved successfully");
        res.send("Application form submitted.");
    })
})
app.post("/admissionForm", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment_dte;
    var studentName = req.body.studentName;
    var courseName = req.body.courseName;
    var hostelName = req.body.hostelName;
    var floor = req.body.floor;
    var roomNo = req.body.roomNo;
    var admissionDate = req.body.admissionDate;
    console.log(enrollment_dte);
    console.log(studentName);
    console.log(courseName);
    console.log(hostelName);
    console.log(floor);
    console.log(roomNo);
    console.log(admissionDate);
    connection.query('INSERT INTO admissionData (enrollment_dte,studentName,courseName,hostelName,floor,roomNo,admissionDate) VALUE (?,?,?,?,?,?,?)', [enrollment_dte, studentName, courseName, hostelName, floor, roomNo, admissionDate], (err, rows, fields) => {
        if (err) throw err

        console.log("Data saved successfully");

        connection.query('INSERT INTO admissionDataCopy (enrollment_dte,studentName,courseName,hostelName,floor,roomNo,admissionDate) VALUE (?,?,?,?,?,?,?)', [enrollment_dte, studentName, courseName, hostelName, floor, roomNo, admissionDate], (err, rows, fields) => {
            if (err) throw err

            console.log("Data saved in Admission Data Copy!");
            res.send("Successfully Alloted");

        })
    })

})
app.post("/dischargeForm", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment_dte;
    var studentName = req.body.studentName;
    var courseName = req.body.courseName;
    var hostelName = req.body.hostelName;
    var floor = req.body.floor;
    var roomNo = req.body.roomNo;
    var dischargeDate = req.body.dischargeDate;
    console.log(enrollment_dte);
    console.log(studentName);
    console.log(hostelName);
    console.log(floor);
    console.log(roomNo);
    console.log(dischargeDate);

    connection.query('INSERT INTO dischargeData (enrollment_dte,studentName,courseName,hostelName,floor,roomNo,dischargeDate) VALUE (?,?,?,?,?,?,?)', [enrollment_dte, studentName, courseName, hostelName, floor, roomNo, dischargeDate], (err, rows, fields) => {
        if (err) throw err
        console.log("Saved in Discharge Data!");
    })
    connection.query('DELETE FROM admissionData WHERE enrollment_dte = ?', [enrollment_dte], (err, rows, fields) => {
        if (err) throw err
        res.send("Successfully Discharged!")
    })
    connection.query('DELETE FROM feesRecord WHERE enrollment_dte = ?', [enrollment_dte], (err, rows, fields) => {
        if (err) throw err
        console.log("Successfully removed from fees record!")
    })
})
app.post("/profileView", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment;
    console.log(enrollment_dte);
    connection.query('SELECT * FROM applicationForm WHERE enrollment_dte = ?', [enrollment_dte], (err, rows, fields) => {
        if (err) throw err

        console.log("Sent successfully" + rows.length);
        res.json(rows);
    })
})
app.post("/roominfoStudent", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment;
    console.log(enrollment_dte);
    connection.query('SELECT * FROM admissionData WHERE enrollment_dte = ?', [enrollment_dte], (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        console.log("Sent successfully " + rows.length);
        res.json(rows);
    })
})
app.post("/roomDashboard", (req, res) => {
    console.log(req.body);
    var hostelName = req.body.hostelName;
    console.log(hostelName);
    connection.query('SELECT * FROM admissionData WHERE hostelName = ?', [hostelName], (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        console.log("Sent successfully " + rows.length);
        res.json(rows);
    })
})
app.post("/complaintBox", (req, res) => {
    console.log(req.body);
    var nameOfComplainer = req.body.nameOfComplainer;
    var mobile = req.body.mobile;
    var complaint = req.body.complaint;
    var complaintID = req.body.complaintID;
    console.log(nameOfComplainer);
    console.log(complaintID);
    console.log(mobile);
    console.log(complaint);

    connection.query('INSERT INTO complaintBox (complaintID, nameOfComplainer,mobile,complaint) VALUE (?,?,?,?)', [complaintID, nameOfComplainer, mobile, complaint], (err, rows, fields) => {
        if (err) throw err
        console.log("Saved in complainBox!");
        res.status(200).send("Your complaint has been submitted!");
    })

})
app.post("/viewComplaint", (req, res) => {

    connection.query('SELECT * FROM complaintBox', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        console.log("Sent successfully " + rows.length);
        res.json(rows);
    })

})
app.post("/viewPayment", (req, res) => {
    console.log(req.body);
    var hostelName = req.body.hostelName;
    console.log(hostelName);
    connection.query('SELECT * FROM feesRecord WHERE hostelName = ?', [hostelName], (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        console.log("Sent successfully " + rows.length);
        res.json(rows);
    })
})
app.post("/feePaymentForm", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment_dte;
    var full_name = req.body.full_name;
    var hostelName = req.body.hostelName;
    var course = req.body.course;
    var semester = req.body.semester;
    var installment = req.body.installment;
    var feesAmount = req.body.feesAmount;
    var dateOfPayment = req.body.dateOfPayment;
    console.log(enrollment_dte);
    console.log(full_name);
    console.log(hostelName);
    console.log(course);
    console.log(semester);
    console.log(installment);
    console.log(feesAmount);
    console.log(dateOfPayment);
        connection.query('INSERT INTO feesRecord (enrollment_dte, fullName,hostelName,courseName,semester,installment,installmentAmount,dateOfPayment) VALUE (?,?,?,?,?,?,?,?)', [enrollment_dte, full_name,hostelName,course, semester,installment,feesAmount,dateOfPayment], (err, rows, fields) => {
            if (err) throw err
            console.log("Saved in Fees Record!");
            res.status(200).send("Payment Successful!");
        })
        connection.query('INSERT INTO feesRecordCopy (enrollment_dte, fullName,hostelName,courseName,semester,installment,installmentAmount,dateOfPayment) VALUE (?,?,?,?,?,?,?,?)', [enrollment_dte, full_name,hostelName,course, semester,installment,feesAmount,dateOfPayment], (err, rows, fields) => {
            if (err) throw err
            console.log("Saved in Fees Record Copy!");
        })
})
app.post("/feesInfoView", (req, res) => {
    console.log(req.body);
    var enrollment_dte = req.body.enrollment;
    console.log(enrollment_dte);
    connection.query('SELECT semester,installment,installmentAmount,dateOfPayment FROM feesRecord WHERE enrollment_dte = ?', [enrollment_dte], (err, rows, fields) => {
        if (err) throw err

        console.log("Sent successfully" + rows.length);
        res.json(rows);
    })
})
app.listen(3001, () => {
    console.log("Yay! Server is Running (Port:3001)");
})