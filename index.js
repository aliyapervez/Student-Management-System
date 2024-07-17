import inquirer from "inquirer";
// define a student class
class student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }
    //Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance = amount;
        console.log(` $${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    //Method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
//defining a Student_manager class to manage students
class Student_manager {
    student;
    constructor() {
        this.student = [];
    }
    //method to add a new student
    add_student(name) {
        let Student = new student(name);
        this.student.push(Student);
        console.log(`student:${name} added sucessfully.student id: ${Student.id}`);
    }
    //method to enroll a student in acourse
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`Course ${course} enrolled successfully for student ${student.name}`);
        }
    }
    //method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found, Plese enter a correct student ID");
        }
    }
    //method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, Plese enter a correct student ID");
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found, Plese enter a correct student ID");
        }
    }
    //method to find a student by student_id
    find_student(student_id) {
        return this.student.find(std => std.id === student_id);
    }
}
// MAIN FUNCTION TO RUN THE PROGRAM 
async function main() {
    console.log("Welcome to my Student Management System Program");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "View Student Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name"
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student -id",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID"
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay fees"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "View Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting the program");
                process.exit(0);
                break;
        }
    }
}
// calling a main function
main();
