---
  title: Customer Relation Manager - Front end
  tech:
    - React
    - React-table
    - Redux
    - Redux-toolkit
    - TailwindCSS
    - Vite
    - React-router
    - Eslint
    - Prettier
  description: >-
   SPA Aplicaction Frontend Customer relation manager, crate with vite, react-router, redux-toolkit,
    using Fake store API, por Fetch Api http request, take the data into a collection,
    in the store, algo working in controlled pagination, for the optimization, react-table.

  liveLink: https://crm-frontend-react-redux.vercel.app/
  githubLink: https://github.com/emavi98/CRM-Frontend-React-Redux
  image: frontend-crm.PNG
  isFeatured: true
  screenshots:
    - screenshot: dashboard.PNG
      description: Dashboard view, estructure used in crm apps.
    - screenshot: react-table.PNG
      description: react table very flexible for this purpose.
    - screenshot: modal.PNG
      description: Again a modal, but this is not a package i build this modal.

---

## Description

In this project i use TailwindCSS, because need more customization in the UI, is fast and also very flexible.

- Includes Login page for Auth, React-big-calendar- React-table
- Redux-toolkit for state management.

## Key takeaways

There are multiple purposes of this project is can connect this front end crm with an e-commerce, backend, apis, services

#### Store

Combines all reducers and apply async-await fuction in replace of Thunks.

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```js
export const storeSlice = createSlice({
  name: "storeData",
  initialState: {
    // Pages
    actualPage: "dashboard",

    // Modals
    isProductModalOpen: false,
    isModalActionOpen: false,
    isNeWProduct: false,
    isModalFeatureOpen: false,

    // Tables
    infoData: [],
    infoColumns: [],
    selectedRecord: [],
    showSelectedrow: false,
    dataList: [],
  },
  reducers: {
    // Pages
    onChangeView: (state, payload) => {},

    // Modals
    onOpenProductModal: (state, { payload }) => {
      state.isNeWProduct
        ? (state.isProductModalOpen = true)
        : (state.isProductModalOpen = true);
      // state.selectedRecord = [{title: '',category: '',description: '',image:'',price:''}]
    },
    onCloseProductModal: (state) => {
      state.isProductModalOpen = false;
      state.selectedRecord = [];
    },

    onOpenDeleteModal: (state) => {
      state.isModalActionOpen = true;
    },

    onCloseDeleteModal: (state) => {
      state.isModalActionOpen = false;
    },

    onOpenFeatureModal: (state) => {
      state.isModalFeatureOpen = true;
    },

    onCloseFeatureModal: (state) => {
      state.isModalFeatureOpen = false;
    },

    // Tables
    onLoadTable: (state, { payload }) => {
      switch (payload.page) {
        case "dashboard":
          state.actualPage = payload.page;
          break;

        case "customers":
          state.actualPage = payload.page;
          state.dataList = payload.data;
          state.infoData = payload.data;
          state.infoColumns = Object.keys(payload.data[0])
            .filter(
              (key) =>
                // Exceptions
                key !== "name" && key !== "address" && key !== "__v"
            )
            .map((key) => {
              return { Header: key, accessor: key };
            });
          break;

        case "orders":
          state.actualPage = payload.page;
          state.dataList = payload.data;
          state.infoData = payload.data;
          state.infoColumns = Object.keys(payload.data[0])
            .filter(
              (key) =>
                // Exceptions
                key !== "products" && key !== "__v"
            )
            .map((key) => {
              return { Header: key, accessor: key };
            });

          break;

        case "products":
          state.actualPage = payload.page;
          state.dataList = payload.data;
          state.infoData = payload.data;
          state.infoColumns = Object.keys(payload.data[0])
            .filter(
              (key) => key !== "rating" /* Exceptions  && key !== "price" */
            )
            .map((key) => {
              return { Header: key, accessor: key };
            });

          break;

        default:
          break;
      }
    },

    onSelectRecord: (state, { payload }) => {
      state.selectedRecord = payload;
      console.log(state.selectedRecord);
    },

    // CRUD Table
    onAddNewProduct: (state, { payload }) => {
      state.infoData.push(payload);
      state.selectedRecord = [];
      state.isProductModalOpen = false;
    },
    onUpdateProduct: (state, { payload }) => {
      state.infoData = state.infoData.map((product) => {
        if (product.id === payload.id) {
          return payload;
        }
        return product;
      });
      state.isProductModalOpen = false;
    },

    onDeleteProduct: (state, { payload }) => {
      state.infoData = state.infoData.filter(
        (product) => product.id !== state.selectedRecord.id
      );
      state.selectedRecord = null;
      state.isModalActionOpen = false;
    },

    // Sidebar

    onClickSidebar: (state, { payload }) => {
      state.actualPage = payload;
    },
  }, // Reducers End
});

// Action creators are generated for each case reducer function
export const {
  // Pages
  onChangeView,

  // Modals
  onOpenProductModal,
  onCloseProductModal,
  onOpenFeatureModal,

  onOpenDeleteModal,
  onCloseDeleteModal,

  // Table
  onLoadTable,
  onSelectRecord,

  // CRUD Table
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onCloseFeatureModal,

  // Sidebar
  onClickSidebar,
} = storeSlice.actions;
```

</details>
<br />

#### Components

This is an SPA aplication, then i use a logic of container, and reused the same container following the dry principle,
if you check the code, you can see that i try to reused all components, also the table is the same for all the views,
the modal is the same, only change the custom form for each modal-view.

<details>

  <summary>
    <ins>View code</ins>
    <span>
      <i class="fa-solid fa-angle-right"></i>
    </span>
  </summary>

```jsx
export const Dashboard = () => {
  const { actualPage } = useSelector((state) => state.storeData);

  const showFabAddNew = () => {
    switch (actualPage) {
      case "dashboard":
        break;
      case "customers":
        return <FabAddNew />;
      case "products":
        return <FabAddNew />;
      case "orders":
        return <FabAddNew />;

      default:
        break;
    }
  };

  const showContainer = () => {
    switch (actualPage) {
      case "dashboard":
        return <DashboardPage />;
      case "customers":
        return <CustomersPage />;
      case "products":
        return <ProductsPage />;
      case "orders":
        return <OrdersPage />;

      default:
        break;
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-auto  mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar />
        <div className="p-2 pt-2 2xl:container">
          <div className="flex flex-col  border-gray-300 rounded-xl">
            {showContainer()}
          </div>
        </div>
      </div>
      <CrudTableModal />
      {showFabAddNew()}
      <ModalConfirmation />
      <FeatureModal />
    </>
  );
};
```

</details>
<br />
