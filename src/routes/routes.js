import HomePage from "../pages/HomePage/HomePage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Profile from "../pages/Profile/Profile";

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
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
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
        path: '/product-detail',
        page: ProductDetail,
        isShowHeader: true,
    },
    {
        path: '/profile',
        page: Profile,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotPoundPage
    }
]