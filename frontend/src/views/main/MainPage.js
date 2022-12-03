import styled from "styled-components";

// 디자인 v2
import Nav from "components/nav/Nav";
import PhotoCarousel from "components/main/PhotoCarousel";
import PopularWordCard from "components/main/PopularWordCard";
import RecentReviewCard from "components/main/RecentReviewCard";
import SametypeUserCard from "components/main/SametypeUserCard";

export default function MainPage() {
  return (
    <StyledWrapper>
      <Nav type="main" />
      <PhotoCarousel />
      <div id="popularwordslist">
        <PopularWordCard />
        <RecentReviewCard />
      </div>

      <div id="sametype">
        <SametypeUserCard />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #popularwordslist {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding: 0 5%;
  }
  #sametype {
    margin-top: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 0 5%;
  }
`;
