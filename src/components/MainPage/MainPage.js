import React, { useState, useRef, useEffect } from 'react'; // React와 필요한 훅을 임포트
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import axios from 'axios'; // HTTP 요청을 위해 axios 임포트
import './MainPage.css'; // CSS 스타일 시트 임포트
import TopBar from '../TopBar/TopBar.js'; // 상단 바 컴포넌트 임포트
import BottomBar from '../BottomBar/BottomBar.js'; // 하단 바 컴포넌트 임포트

const MainPage = ({ setSelectedResult }) => {
  const [isKeywordSearch, setIsKeywordSearch] = useState(false); // 키워드 검색 모드 상태
  const [isVisualSearch, setIsVisualSearch] = useState(false); // 비주얼 검색 모드 상태
  const [showSearchResult, setShowSearchResult] = useState(false); // 검색 결과 표시 상태
  const [searchTags, setSearchTags] = useState([]); // 검색 태그 상태
  const [inputValue, setInputValue] = useState(''); // 입력값 상태
  const [searchResults, setSearchResults] = useState([]); // 키워드 검색 결과 상태
  const [draggedItem, setDraggedItem] = useState(null); // 드래그한 아이템 상태
  const [droppedItems, setDroppedItems] = useState([]); // 비주얼 검색에서 드랍된 아이템 상태
  const [visualSearchResults, setVisualSearchResults] = useState([]); // 비주얼 검색 결과 상태
  const [isTransitioning, setIsTransitioning] = useState(false); // 전환 애니메이션 상태
  const itemListContainerRef = useRef(null); // item-list-container를 참조할 수 있는 Ref


  const recipeTextRef = useRef(null); // 레시피 텍스트를 참조할 수 있는 Ref

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const seUser = sessionStorage.getItem('user'); // 유저 아이디를 변수에 저장
  console.log('mainpage에서 확인한 세션아이디 저장값', seUser);


  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault(); // 기본 동작 방지
      if (itemListContainerRef.current) {
        itemListContainerRef.current.scrollLeft += event.deltaY;
      }
    };
  
    const container = itemListContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false }); // passive 옵션 설정
    }
  
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [itemListContainerRef.current]);
  // 추천 레시피를 콘솔에 출력하는 함수
  const logRecommendedRecipes = async () => {
    if (!seUser) return; // 로그인하지 않은 경우

    try {
      const response = await axios.get('http://localhost:4000/random-food-idx', {
        params: { userId: seUser } // 로그인한 사용자 아이디를 서버에 전달
      });
      console.log('추천 레시피:', response.data); // 추천 레시피 콘솔에 출력
    } catch (error) {
      console.error('추천 레시피 가져오기 오류:', error);
    }
  };

  // 페이지 렌더링 시 추천 레시피 로깅
  useEffect(() => {
    logRecommendedRecipes();
  }, [seUser]);

  // 키워드 검색 결과를 서버에서 가져오는 함수
  const fetchSearchResults = async () => {
    try {
      const ingredients = searchTags.map(tag => tag.text).join(','); // 검색 태그를 쉼표로 구분된 문자열로 변환
      const response = await axios.get('http://localhost:4000/foods/search', {
        params: { q: ingredients } // 요청 파라미터에 검색 태그 추가
      });
      const uniqueResults = response.data.reduce((acc, current) => {
        const x = acc.find(item => item.food_idx === current.food_idx); // 중복 제거
        if (!x) {
          return acc.concat([current]); // 중복이 없으면 결과 배열에 추가
        } else {
          return acc; // 중복이 있으면 그대로 반환
        }
      }, []);
      setSearchResults(uniqueResults); // 검색 결과 상태 업데이트
    } catch (error) {
      console.error('Error fetching search results:', error); // 오류 발생 시 로그 출력
    }
  };

  // 비주얼 검색 결과를 서버에서 가져오는 함수
  const fetchVisualSearchResults = async () => {
    try {
      const ingredients = droppedItems.map(tag => tag.text).join(','); // 드랍된 아이템을 쉼표로 구분된 문자열로 변환
      const response = await axios.get('http://localhost:4000/foods/search', {
        params: { q: ingredients } // 요청 파라미터에 검색 태그 추가
      });
      const uniqueResults = response.data.reduce((acc, current) => {
        const x = acc.find(item => item.food_idx === current.food_idx); // 중복 제거
        if (!x) {
          return acc.concat([current]); // 중복이 없으면 결과 배열에 추가
        } else {
          return acc; // 중복이 있으면 그대로 반환
        }
      }, []);
      setVisualSearchResults(uniqueResults); // 비주얼 검색 결과 상태 업데이트
    } catch (error) {
      console.error('Error fetching visual search results:', error.message); // 오류 발생 시 로그 출력
      console.error('Error details:', error.response ? error.response.data : error); // 오류 세부 사항 로그 출력
    }
  };

  // 키워드 검색 시 Enter 입력 시 검색 태그 추가 및 검색 수행
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 Enter 키 동작 방지
      if (inputValue.trim()) { // 입력값이 비어있지 않으면
        setSearchTags(prevTags => [...prevTags, { text: inputValue.trim() }]); // 검색 태그 추가
        setInputValue(''); // 입력값 초기화
      }
      setIsKeywordSearch(true); // 키워드 검색 모드 활성화
      fetchSearchResults(); // 검색 결과 가져오기
    }
  };

  // 키워드 검색에서 검색 시작 버튼 클릭 시 처리
  const handleStartClick = () => {
    if (searchTags.length === 0) { // 검색 태그가 없으면
      alert('반드시 하나 이상의 재료를 입력하세요'); // 경고 메시지 표시
    } else {
      fetchSearchResults(); // 검색 결과 가져오기
    }
  };

  // 등록된 검색어 제거
  const removeTag = (index) => {
    setSearchTags(tags => tags.filter((_, i) => i !== index)); // 지정된 인덱스의 검색어 제거
  };

  // 키워드 검색 결과 렌더링
  const renderSearchResults = () => {
    console.log('키워드 검색 결과요: ', searchResults); // 디버깅 로그
    const rows = [];
    for (let i = 0; i < searchResults.length; i += 2) {
      rows.push(searchResults.slice(i, i + 1)); // 두 개씩 묶어서 행을 생성
    }
    return (
      <div className="search-results-container">
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="search-results-row">
              {row.map((result) => (
                <div key={result.food_idx} className="result-square" onClick={() => handleResultClick(result)}>
                  <div className="result-square-text">
                    <h3>{result.food_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="result-square">
            <div className="result-square-text">검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    );
  };

  // 비주얼 검색 결과 렌더링
  const renderVisualSearchResults = () => {
    console.log('비주얼 검색 결과 : ', visualSearchResults); // 디버깅 로그
    const rows = [];
    for (let i = 0; i < visualSearchResults.length; i += 2) {
      rows.push(visualSearchResults.slice(i, i + 1)); // 두 개씩 묶어서 행을 생성
    }
    return (
      <div className="vs-results-container">
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="vs-results-row">
              {row.map((result) => (
                <div key={result.food_idx} className="vs-search-result-box" onClick={() => handleResultClick(result)}>
                  <div className="vs-search-result-text">
                    <h3>{result.food_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="vs-search-result-box">
            <div className="result-square-text">검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    );
  };

  // 결과 클릭 시 처리 함수
  const handleResultClick = (result) => {
    setSelectedResult(result); // 결과 정보를 상태로 설정
    navigate('/DetailPage'); // 페이지 이동
  };

  // 키워드 검색 모드로 전환
  const keywordSearching = () => {
    setIsKeywordSearch(true); // 키워드 검색 모드 활성화
    setIsVisualSearch(false); // 비주얼 검색 모드 비활성화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
  };

  // 비주얼 검색 모드로 전환
  const visualSearching = () => {
    setIsKeywordSearch(false); // 키워드 검색 모드 비활성화
    setIsVisualSearch(true); // 비주얼 검색 모드 활성화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
  };

  // 레시피 페이지로 이동
  const handleClick = () => {
    try {
      window.location.href = '/ResultPage'; // 결과 페이지로 이동
    } catch {
      console.log("레시피 결과 보기 실패!"); // 이동 실패 시 로그 출력
    }
  };

  // 입력값 변경 처리
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // 입력값 상태 업데이트
  };

  // 키워드 검색 시 전체 취소 버튼 클릭 시 처리
  const handleCancelClick = () => {
    setSearchTags([]); // 검색 태그 초기화
    setInputValue(''); // 입력값 초기화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
    setSearchResults([]); // 검색 결과 초기화
  };

  // 비주얼 검색 시작 버튼 클릭 시 처리
  const vsHandleStartClick = async () => {
    if (droppedItems.length === 0) { // 드랍된 아이템이 없으면
      alert('반드시 하나 이상의 재료를 입력하세요'); // 경고 메시지 표시
    } else {
      setIsTransitioning(true); // 전환 애니메이션 시작
      setTimeout(async () => {
        setShowSearchResult(true); // 검색 결과 표시 활성화
        await fetchVisualSearchResults(); // 비주얼 검색 결과 가져오기
        setIsTransitioning(false); // 전환 애니메이션 종료
      }, 500); // 500ms 후에 검색 결과 가져오기
    }
  };

  // 비주얼 검색 시 전체 취소 버튼 클릭 시 처리
  const vsHandleCancelClick = () => {
    setSearchTags([]); // 검색 태그 초기화
    setInputValue(''); // 입력값 초기화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
    setSearchResults([]); // 검색 결과 초기화
    setDroppedItems([]); // 드랍된 아이템 초기화
  };

  // 키워드 검색 모드에서 뒤로 가기 버튼 클릭 시 처리
  const handleKeywordBackClick = () => {
    setIsKeywordSearch(false); // 키워드 검색 모드 비활성화
    setSearchTags([]); // 검색 태그 초기화
    setInputValue(''); // 입력값 초기화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
    setSearchResults([]); // 검색 결과 초기화
  };

  // 비주얼 검색 모드에서 뒤로 가기 버튼 클릭 시 처리
  const vsHandleBackClick = () => {
    setIsVisualSearch(false); // 비주얼 검색 모드 비활성화
    setSearchTags([]); // 검색 태그 초기화
    setInputValue(''); // 입력값 초기화
    setShowSearchResult(false); // 검색 결과 표시 비활성화
    setSearchResults([]); // 검색 결과 초기화
    setVisualSearchResults([]); // 비주얼 검색 결과 초기화
    renderVisualSearchResults(); // 비주얼 검색 결과 렌더링 초기화
    fetchVisualSearchResults(); // 비주얼 검색 결과 가져오기 초기화
  };

  // 비주얼 검색 모드에서 드래그 시작 처리
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index); // 드래그된 아이템의 인덱스를 데이터로 설정
    setDraggedItem(index); // 드래그한 아이템 상태 업데이트
  };

  // 비주얼 검색 모드에서 드래그 오버 처리
  const handleDragOver = (event) => {
    event.preventDefault(); // 기본 드래그 오버 동작 방지
  };

  // 비주얼 검색 모드에서 드랍 처리
  const handleDrop = (event) => {
    event.preventDefault(); // 기본 드랍 동작 방지
    if (droppedItems.length >= 8) { // 드랍된 아이템이 8개 이상이면
      alert("아이템 한도에 도달했습니다."); // 경고 메시지 표시
      return;
    }
    const draggedIndex = event.dataTransfer.getData("text/plain"); // 드래그된 아이템의 인덱스 가져오기
    const item = itemTexts[draggedIndex]; // 인덱스를 사용하여 아이템 가져오기
    if (!droppedItems.find(droppedItem => droppedItem.text === item.text)) { // 드랍된 아이템 목록에 없는 경우
      setDroppedItems([...droppedItems, item]); // 드랍된 아이템 목록에 추가
    }
    setDraggedItem(null); // 드래그한 아이템 상태 초기화
  };

  // 비주얼 검색 모드에서 드랍된 문자열 제거
  const removeDroppedItem = (index) => {
    setDroppedItems(items => items.filter((_, i) => i !== index)); // 지정된 인덱스의 드랍된 아이템 제거
  };

  // 페이지 제목 렌더링
  const renderRecipeText = () => {
    if (isKeywordSearch && !isVisualSearch) { // 키워드 검색 모드일 때
      return (
        <>
          <span className="back-arrow" onClick={handleKeywordBackClick}>←</span>
          {'키워드 검색'}
        </>
      );
    } else if (isVisualSearch && !isKeywordSearch) { // 비주얼 검색 모드일 때
      return (
        <>
          <span className="visual-backarrow" onClick={vsHandleBackClick}>←</span>
          {'비주얼 검색'}
        </>
      );
    } else {
      return '레시피 찾아보기'; // 기본 페이지 제목
    }
  };

  const itemTexts = [ // 비주얼 검색에서 사용할 아이템 텍스트 배열
    { text: '닭', imageUrl: '/static/img/Chicken.png' },
    { text: '고구마', imageUrl: '/static/img/Sweet potato.png' },
    { text: '양파', imageUrl: '/static/img/Onion.png' },
    { text: '양배추', imageUrl: '/static/img/Cabbage.png' },
    { text: '마늘', imageUrl: '/static/img/Garlic.png' },
    { text: '설탕', imageUrl: '/static/img/Sugar.png' },
    { text: '깻잎', imageUrl: '/static/img/Perilla leaves.png' },
    { text: '고추장', imageUrl: '/static/img/red chili paste.png' },
    { text: '소', imageUrl: '/static/img/Beef.png' },
    { text: '돼지', imageUrl: '/static/img/pork.png' }
  ];

  // 드랍된 아이템이 변경되면 비주얼 검색 결과를 가져오기
  useEffect(() => {
    if (isVisualSearch && droppedItems.length > 0) {
      fetchVisualSearchResults(); // 비주얼 검색 결과 가져오기
    }
  }, [droppedItems, isVisualSearch]); // 의존성 배열에 드랍된 아이템과 비주얼 검색 모드 추가

  return (
    <div className="main-page"> {/* 메인 페이지 컨테이너 */}
      <TopBar /> {/* 상단 바 렌더링 */}
      <BottomBar /> {/* 하단 바 렌더링 */}
      <div
        className="recipe-text"
        ref={recipeTextRef}
        style={{
          textAlign: 'center', // 텍스트 가운데 정렬
          position: 'absolute', // 절대 위치
          left: isKeywordSearch ? '50%' : 'auto', // 키워드 검색 모드일 때 왼쪽 위치 설정
          transform: isKeywordSearch ? 'translateX(-50%)' : 'none', // 키워드 검색 모드일 때 중앙 정렬
          width: '100%', // 너비 100%
        }}
      >
        {renderRecipeText()} {/* 페이지 제목 렌더링 */}
      </div>

      <div className="select-btn-container"> {/* 버튼 컨테이너 */}
        {!isVisualSearch && ( /* 비주얼 검색 모드가 아닐 때만 렌더링 */
          <div className={`left-container ${isKeywordSearch ? 'expand' : ''}`} onClick={keywordSearching}>
            <div className={`searching-input ${isKeywordSearch ? 'expand-width' : ''}`}>
              {isKeywordSearch ? ( /* 키워드 검색 모드일 때 */
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                />
              ) : (
                <div className="searching-input-text">키워드 검색</div>
              )}
            </div>
          </div>
        )}
        <div className="search-tags-container"> {/* 검색 태그 컨테이너 */}
          {searchTags.map((tag, index) => (
            <div className="search-tag" key={index}>
              {tag.text}
              <span className="remove-tag" onClick={() => removeTag(index)}>×</span>
            </div>
          ))}
        </div>
      </div>

      {!isKeywordSearch && !isVisualSearch && ( /* 키워드 검색 및 비주얼 검색 모드가 아닐 때 렌더링 */
        <div className="tiktok"></div>
      )}

      {!isKeywordSearch && (
        <>
          <div className="right-container" onClick={visualSearching} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="searching-plate">
              {!isVisualSearch && (
                <div className="searching-plate-text">비주얼 검색</div>
              )}
            </div>
          </div>
          {isVisualSearch && (
            <>
              <div className={`visual-text-container ${isTransitioning ? 'fade-out' : ''}`}>
                {droppedItems.map((item, index) => (
                  <div key={index} className="dropped-item">
                    {item.text}
                    <span className="remove-tag" onClick={() => removeDroppedItem(index)}>×</span>
                  </div>
                ))}
              </div>
            </>
          )}

        </>
      )}

      <div className="food-pic"></div> {/* 음식 사진 컨테이너 */}

      {!isKeywordSearch && !isVisualSearch && (
        <>
          <div className="recom-container"> {/* 추천 컨테이너 */}
            <div className="recom-text">{seUser}님이 좋아할 요리를 찾았어요!</div>
            <div className="recom-subtext">{seUser}님의 기록을 분석하여 찾은 결과입니다</div>
          </div>
          <div className="food-result-top-container"> {/* 음식 결과 상단 컨테이너 */}
            <div className="fr" onClick={handleClick}></div>
            <div className="fr" onClick={handleClick}></div>
            <div className="fr" onClick={handleClick}></div>
          </div>
          <div className="food-result-bottom-container"> {/* 음식 결과 하단 컨테이너 */}
            <div className="fr" onClick={handleClick}></div>
            <div className="fr" onClick={handleClick}></div>
            <div className="fr" onClick={handleClick}></div>
          </div>
        </>
      )}

      {isKeywordSearch && ( /* 키워드 검색 모드일 때 렌더링 */
        <div className="recom-btn-container">
          <div className="search-result-text">검색 결과</div>
          <button className="cancel-btn" onClick={handleCancelClick}>전체 취소</button>
          <button className="start-btn" onClick={handleStartClick}>시작</button>
        </div>
      )}

      {isKeywordSearch && searchResults.length > 0 && renderSearchResults()} {/* 검색 결과가 있을 때 렌더링 */}

      {isVisualSearch && (
        <>
          <div className="vs-recom-btn-container">
            <div className="ingre-list">재료</div>
            <button className="vs-cancel-btn" onClick={vsHandleCancelClick}>전체 취소</button>
            <button className="vs-start-btn" onClick={vsHandleStartClick}>시작</button>
          </div>
          {!showSearchResult && (
            <div
              className={`item-list-container ${isTransitioning ? 'fade-out' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              ref={itemListContainerRef} // 추가된 부분
            >
              {itemTexts.map((item, index) => (
                <div
                  key={index}
                  className={`item-box ${draggedItem === index ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <img src={item.imageUrl} alt={item.text} className="item-image" />
                  <span className="item-text">{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isVisualSearch && showSearchResult && visualSearchResults.length > 0 && renderVisualSearchResults()} {/* 비주얼 검색 결과 렌더링 */}
    </div>
  );
};

export default MainPage; /* MainPage 컴포넌트 내보내기 */
