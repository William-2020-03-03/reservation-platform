import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from '../const';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);

  // 如果有 token，则克隆请求并添加 Authorization 头
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 如果没有 token，直接传递原始请求
  return next(req);
};
