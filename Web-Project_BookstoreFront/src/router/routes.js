const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/book', component: () => import('pages/BookListPage.vue') },
      { path: '/review', component: () => import('pages/ReviewPage.vue') },
      { path: "/allpayment",name: "ViewPayment",component: () => import("pages/ViewPayment.vue") },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
