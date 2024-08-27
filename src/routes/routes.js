import HomePage from "../pages/HomePage/HomePage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Profile from "../pages/Profile/Profile";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPayPage from "../pages/PaymentPage/PaymentPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true,
    },
    {
        path: '/product-detail/:id',
        page: ProductDetail,
        isShowHeader: true,
    },
    {
        path: '/profile',
        page: Profile,
        isShowHeader: true,
    },
    {
        path: '/my-order/:id',
        page: MyOrderPage,
        isShowHeader: true,
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: false,
    },
    {
        path: '*',
        page: NotPoundPage
    }
]