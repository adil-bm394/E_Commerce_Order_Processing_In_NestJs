export const messages = {
  USER_REGISTERED: 'Successfully User Registered',
  USER_LOGIN: 'Successfully User Login',
  USER_ALREADY_EXIST: 'User Already Exist',
  USER_NOT_FOUND: 'User Not Found',
  INVALID_CREDENTIAL: 'Invalid credential',
  USER_NOT_AUTHORIZED: 'User Is Not Authorized',
  ORDER_NOT_FOUND: 'Order Is Not Found',
  ORDER_CREATED: 'successfully Order created',
  USER_ID_REQUIRED: 'User ID is Required',
  GET_USER_DETAILS: 'Successfully Fetched User Details',
  INTERNAL_SERVER_ERROR: 'An internal server error occurred',
  MISSING_AUTH_HEADER: 'Missing Authorization header',
  ORDER_FETCHED: 'Successfully Order Fetched',
  ORDER_UPDATED: 'Order has been updated successfully.',
  TOKEN_MISSING: 'Token Is Missing',
  INVALID_TOKEN: 'Token is Missmatch',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  ORDERED_NOT_CONFIRMED: 'Order is not confirmed(May be payment not done)',
  PARAM_ID_MISSSING: 'Order Id is missing from Param',
  ORDER_SHIPPED: 'Product has been shipped',
};

export const getSubject=(product:string)=> {
  return `Order Shipped: ${product} - Your Order has been Shipped!`;
}