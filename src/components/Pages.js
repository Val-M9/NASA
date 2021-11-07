import { Pagination } from "antd";

const Pages = ({ photosPerPage, changePageHandler, photosCount }) => {
  return (
    <>
      <Pagination
        defaultCurrent={1}
        total={photosCount}
        pageSize={photosPerPage}
        onChange={changePageHandler}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </>
  );
};

export default Pages;
