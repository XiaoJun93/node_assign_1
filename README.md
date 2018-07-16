# node_assign_1
This is for node.js class assignment 1

As assignment request, this the a simple hello world API. when user post anything to the route /hello, a message will return in
JSON format as below:
{
    "status": "success",
    "message": "Welcome to my first node.js assignment."
}

else if the routes is not /hello, the system shall return 
{
    "status": "page not found",
    "message": "The page you looking are not found"
}
