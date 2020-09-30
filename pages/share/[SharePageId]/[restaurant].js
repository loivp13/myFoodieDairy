import axios from "axios";
import { API } from "../../../config";
import SharePage from "../../../components/SharePage";
import Layout from "../../../components/Layout";

const ShareRestaurant = ({ pageItems, pageInfo }) => {
  return (
    <Layout>
      <SharePage pageInfo={pageInfo} pageItems={pageItems}></SharePage>
    </Layout>
  );
};

ShareRestaurant.getInitialProps = async ({ query }) => {
  const { SharePageId, restaurant } = query;
  try {
    const response = await axios.get(
      `${API}/share/${SharePageId}/${restaurant}`
    );
    return {
      pageItems: response.data.items,
      pageInfo: response.data.restaurant,
    };
  } catch (err) {
    console.log(err);
    console.log(err);
    return {
      items: null,
      restaurant: null,
    };
  }
};
export default ShareRestaurant;
