async function test() {
    const employee_roles = await query(`SELECT * FROM role`);
    console.log(employee_roles)

}

test();