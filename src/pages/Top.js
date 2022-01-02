import React, { useContext, useEffect } from "react";
import { fetchPopularData } from "../apis/index";
import Layout from "../components/layout/Layout";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import { Store } from "../store/index";
import VideoGridItem from "../VideoGridItem/VideoGridItem";

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);

  useEffect(() => {
    fetchPopularData().then((res) => {
      console.log("data", res);
      setGlobalState({
        type: "SET_POPULAR",
        payload: { popular: res.data.items },
      });
    });
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular &&
          globalState.popular.map((popular) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={popular.id}
                src={popular.snippet.thumbnails.high.url}
                title={popular.snippet.title}
              />
            );
          })}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
