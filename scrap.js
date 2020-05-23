await mgrsObj.forEach(({ employee_id, first_name, last_name, title }) => mgrsArr.push({ employee_id, first_name + ' ' + last_name + ' ' + '-' + ' ' + title }));
