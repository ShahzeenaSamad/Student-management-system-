#! /usr/bin/env node
//SHABANG
import chalk from "chalk";
import inquirer from "inquirer";
//Define a student class
class student {
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; //initialize empty array for courses
        this.balance = 100;
    }
    //Method to enroll a student in a course (Method=another name of function)
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view a student balance
    view_balance() {
        console.log(chalk.yellowBright(`\nBalance for ${this.name} : $${this.balance}\n`));
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.yellowBright(`\n$${amount} Fees paid successfully for ${this.name}\n`));
    }
    //Method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Course : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
student.counter = 10000;
//Defining a student manager class to manage students
class student_manager {
    constructor() {
        this.student = [];
    }
    //Method to add new student 
    add_student(name) {
        let student1 = new student(name);
        this.student.push(student1);
        console.log(chalk.yellowBright(`\nstudent : ${name} added successfuly. Student ID : ${student1.id}\n`));
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.yellowBright(`\n${student.name} enrolled in ${course} successfully\n`));
        }
    }
    // Method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.redBright("Student not found.Please enter a correct student ID"));
        }
    }
    //Method to pay student fees:
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.redBright("student not found.Please enter a correct student ID"));
        }
    }
    //Method to display studemt status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student id:
    find_student(student_id) {
        return this.student.find(std => std.id == student_id);
    }
}
//Main function to run the programm
async function main() {
    console.log(chalk.magentaBright("\t", "-".repeat(60)));
    console.log(chalk.bgBlueBright.bold.underline.blackBright("\t\t*** WELCOME TO STUDENT MANAGEMENT SYSTEM ***\t"));
    console.log(chalk.magentaBright("\t", "-".repeat(60)));
    let std_manager = new student_manager();
    //while loop to keep programm running
    while (true) {
        let choices = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: chalk.green("\nSelect an option\n"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case to handle user choice
        switch (choices.choices) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.green("\nEnter a student name"),
                    }
                ]);
                std_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("\nEnter a Student ID"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.green("\nEnter a Course Name\n"),
                    }
                ]);
                std_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("\nEnter a Student ID\n"),
                    }
                ]);
                std_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("\nEnter a student ID\n"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.green("\nEnter the amount to pay\n")
                    }
                ]);
                std_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("\nEnter a student ID\n")
                    }
                ]);
                std_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.red("\nExiting..."));
                process.exit();
        }
    }
}
//calling the main function
main();
