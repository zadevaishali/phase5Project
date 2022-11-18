export default class Util {
    static generateRandomString = (length: number) =>
      Math.random().toString(20).substr(2, length);
  
    static generateOrderStatus = () => {
      let statusStrings = [
        'order placed',
        'order delivered',
        'ready for dispatch',
        'out for delivery',
      ];
      let index = Math.floor(Math.random() * statusStrings.length);
      return statusStrings[index];
    };
  }
  