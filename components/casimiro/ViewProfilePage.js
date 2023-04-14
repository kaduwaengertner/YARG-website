import { useRouter } from "next/router";
import useUser from "/lib/useUser";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const ViewProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { slug } = router.query;
  const username = slug?.[0];
  const [memberData, setMemberData] = useState(null);
  const [cardNames, setCardNames] = useState([]);
  const [collectionSize, setCollectionSize] = useState(0);
  const [collectionCompletePercentage, setCollectionCompletePercentage] = useState(0);
  const [collectionCardsOwned, setCollectionCardsOwned] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCollectionSize = async () => {
      try {
        const response = await fetch(
          `https://casimiro-stream-default-rtdb.firebaseio.com/collectibles/cards.json`
        );
        const data = await response.json();
        setCollectionSize(Object.keys(data).length);
      } catch (error) {
        console.error("Erro ao encontrar cartas:", error);
      }
    };
  
    fetchCollectionSize();
  }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `https://casimiro-stream-default-rtdb.firebaseio.com/users.json`
        );
        const data = await response.json();
        console.log(router.query.username);
        const memberId = Object.keys(data).find(
          (id) =>
            data[id].account.name === router.query.username?.toLowerCase()
        );
        setMemberData(data[memberId]);
        console.log(memberData);
      } catch (error) {
        console.error("Erro ao encontrar usuário:", error);
      }
    };

    fetchMemberData();
  }, [router.query.username]);

  useEffect(() => {
    if (memberData) {
      const fetchCardData = async () => {
        try {
          const response = await fetch(
            `https://casimiro-stream-default-rtdb.firebaseio.com/collectibles/cards.json`
          );
          const data = await response.json();
          const cardData = memberData.collection.cards.map((cardObj) => {
            return data[cardObj.id];
          });
          setCards(cardData);
          console.log(cardData);
      
          setCollectionCardsOwned(cardData.length);
          setCollectionCompletePercentage((cardData.length / collectionSize) * 100);
        } catch (error) {
          console.error("Erro ao encontrar cartas:", error);
        }
      };

      fetchCardData();
    }
  }, [memberData]);

  return (
    <div>
      {memberData ? (
        <div>
          <div className="profile-banner" style={{ backgroundColor: `url(${memberData.profile.color})` }}>
            <div className="profile-banner-image" style={{ backgroundImage: `url(${memberData.profile.avatar})` }}></div>
          </div>
          <div className="profile-body">
            <div className="profile-header">
              <div className="profile-avatar"><Image src={memberData.profile.avatar} alt={memberData.profile.name_display} width="125" height="125"/></div>
              <div className="profile-name">{memberData.profile.name_display}</div>
              {/* <div className="profile-extra">
                <div className="profile-team">{memberData.profile.team}</div>
              </div> */}
            </div>
            <div className="profile-collection">
              <div className="collection-header">
                <div className="collection-percentage">Your collection is <span className="collection-percentage-tag">{Math.round(collectionCompletePercentage)}%</span> complete</div>
                <div className="collection-cards-total"><span className="collection-cards-total-tag">{collectionCardsOwned}</span> / {collectionSize}</div>
              </div>
              <div className="collection-cards">
              {cards.map((card) => (
                <div className="collected-card" key={card.id}>
                  <Image src={`/casimiro-cards/${card.id}.png`} width="200" height="279" />
                </div>
              ))}
              </div>
            </div>
            {/* <div className="profile-footer">
              Desenvolvido por Kadu x Mago
            </div> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="profile-notfound">Usuário não encontrado.</div>
        </div>
      )}
    </div>
  );
};

export default ViewProfilePage;
