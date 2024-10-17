const fs = require("fs");

// architecture of  NodeJS.
// client reqquest to server the request goes to event queue uske bad event loop me jata waha se ek blocking (synchronous) and dusra asynchronous jo non-blocking hota. jo non blocking element hota wo direct response kr deta or blocking request phle thread pool me jata whaa pr minimum 4 numbers of thread hote .jo thread free hota wo request or work krta or complete hone pr wps se response kr deta. 