import { User } from 'src/auth/schemas/user.schema';
import { Product } from 'src/utils/interface/types';

export const getNotificationTemplate = (
  user: User,
  product: Product,
): string => {
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Your Order Confirmation</h2>
        <p style="color: #555;">Hello <strong>${user.name}</strong>,</p>
        <p style="color: #555;">
          Thank you for your order! Your Product ID is <strong>${product.orderId}</strong>. We're pleased to inform you that your order for <strong>${product.product}</strong> has been successfully shipped to ${user.address}.
        </p>
        <br>
        <p style="color: #555;">Thank you for shopping with us,</p>
        <p style="color: #333; font-weight: bold;">The ShopSphere Team</p>
      </div>
    </div>
  `;
};
