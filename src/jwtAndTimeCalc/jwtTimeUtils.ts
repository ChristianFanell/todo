/**
 *  utility functions for calculate expire time on tokens and to decode jwt
 * @param token 
 */


/**
 * return token payload
 * @param token 
 */ 
export const parseJwt = (token : string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

export const createDate = (unixTimeStamp : number) => {
    return new Date(unixTimeStamp * 1000);
}

export const isValidToken = (currentTime : Date, tokenExpireTime : Date) => {
    return currentTime < tokenExpireTime;
}
  