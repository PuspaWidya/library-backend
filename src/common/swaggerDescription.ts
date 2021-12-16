export const registerDescriptionSwagger = `Endpoint to register new member \n
these are the keys and values of dto : 
- name  : member's name, with minimal length 6 and maximal length 30
- email : member's email, must be unique with minimal length 6 and maximal length 30
- password : member's password, with minimal length 6 and maximal length 30
- username  : member's username, with minimal length 6 and maximal length 30
`;

export const getAllMemberSwagger = `Endpoint to get all member with number of books being borrowed by each member, can be access if member already signup`;

export const loginMemberSwagger = `Endpoint to signup already registered member \n
these are the keys and values of dto : 
- password : must be already registered password
- email : must be already registered email`;

export const checkHealth = `Endpoint to checking health`;

export const loanBookDescriptionSwagger = `Endpoint for members to borrow book that already on database \n
can be access if member already signup\n
these are the keys and values of dto : 
- identifier : book's title or code
`;

export const returnBookSwagger = `
Endpoint for members to return book \n
can be access if member already signup\n
these are the keys and values of dto : 
- identifier : book's title or code
- returnedDate : book returned date`;

export const getAllBook = `
Endpoint to get existing book and quantities\n
Book that are being borrows are ignored\n
can be access if member already signup\n
`;
