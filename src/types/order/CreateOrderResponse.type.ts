interface CreateOrderSuccessResponse {
  success: 1;
}

interface CreateOrderErrorResponse {
  success: 0;
  error: string;
}

type CreateOrderResponse =
  | CreateOrderSuccessResponse
  | CreateOrderErrorResponse;
