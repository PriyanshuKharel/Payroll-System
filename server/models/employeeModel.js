const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
    VAT: {
      type: Number,
      default: 13,
      required: true,
    },
    TDS: {
      type: Number,
      default: 1.3,
      required: true,
    },
    SSF: {
      type: Number,
      default: 3000,
      required: true,
    },
    remainingAmount: {
      type: Number,
    },
    joinedDate: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
      required: true,
      default: "unpaid",
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.pre("save", function (next) {
  //   if (this.sharing) {
  //     this.remainingAmount =
  //       this.amount -
  //       (this.amount * this.sharing) / 100 -
  //       (this.amount * this.VAT) / 100 -
  //       (this.amount * this.TDS) / 100;
  //   } else {
  this.remainingAmount =
    this.salary -
    this.salary * this.VAT -
    this.salary * this.TDS -
    this.salary * this.SSF;
  //   }
  next();
});

module.exports = mongoose.model("Employee", EmployeeSchema);
