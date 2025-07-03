module.exports = {
    customerList: "select* from customers",
    cucstomerInsert: "insert into customers set ?",
    customerUpdate: "update customers set ? where id = ?",
    customerDelete: "delete from customers where id = ?",
};