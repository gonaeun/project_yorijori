import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../TopBar/TopBar.js';
import BottomBar from '../BottomBar/BottomBar.js';
import './DetailPage.css';

const DetailPage = ({ result }) => {
  const { foodIdx } = useParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState(''); // 상세 설명을 위한 상태 추가

  const seUser = sessionStorage.getItem('user'); // 유저 아이디를 변수에 저장
  console.log('디테일에서 확인한 세션아이디 저장값', seUser);

  const user_id = seUser;

  const filledHeart = process.env.PUBLIC_URL + '/static/img/red heart_filled.png';
  const emptyHeart = process.env.PUBLIC_URL + '/static/img/red heart.png';


  useEffect(() => {
    console.log('DetailPage에서 받은 결과:', result); //props 방식으로 가져온 음식 데이터 정보

    const fdid = result.food_idx;

    //1. 댓글 데이터를 가져오는 함수
    const getcomts = async () => {
      try {
        // API 요청으로 댓글 데이터 가져오기
        const response = await fetch(`http://localhost:4000/comts/comtssee?food_idx=${fdid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('정보를 불러올 수 없습니다.');
        }
        const cmdata = await response.json();
        console.log('댓글 데이터 : ', cmdata);

        setComments(cmdata); // 가져온 댓글 데이터를 상태로 설정
      } catch (error) {
        console.error('에러 발생', error);
        alert('정보를 불러올 수 없습니다.');
      }
    };

    // 즐겨찾기 추가, 삭제
    const fetchBookmarkStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/favorites/status', {
          params: { user_id, foodIdx }
        });
        setIsBookmarked(response.data.isBookmarked);
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };

    const fetchDetails = async () => {
      try {
        const response = await axios.get('/api/details');
        setTitle(response.data.title);
        setSubtitle(response.data.subtitle);
        setDescription(response.data.description); // 상세 설명 설정
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchBookmarkStatus();    // 북마크 상태를 가져오는 함수
    fetchDetails();           // 상세 정보를 가져오는 함수
    getcomts();               // 실제 댓글 데이터를 가져오는 함수
  }, [user_id, foodIdx]);

  // 댓글 삭제 함수
  const delcomts = async (comments_idx) => {
    try {
      const response = await fetch(`http://localhost:4000/comts/comtsdelete?comments_idx=${comments_idx}&user_id=${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('정보를 삭제할 수 없습니다.');
      }
      const data = await response.json();
      console.log('게시글 삭제 응답:', data);
      setComments(comments.filter(comment => comment.comments_idx !== comments_idx)); // 삭제된 댓글을 상태에서 제거
    } catch (error) {
      console.error('에러 발생:', error);
      alert('정보를 삭제할 수 없습니다.');
    }
  };

  // 댓글 수정 함수
  const mocomts = async (comments_idx) => {
    try {
      const updatedComment = {
        comment_text: editingText,
        user_id: user_id
      };

      console.log('수정하는 데이터:', updatedComment); // 프론트엔드 콘솔에 수정 데이터 출력

      const response = await fetch(`http://localhost:4000/comts/comtsmodify?comments_idx=${comments_idx}&user_id=${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedComment)
      });

      if (!response.ok) {
        throw new Error('정보를 수정할 수 없습니다.');
      }

      const data = await response.json();
      console.log('댓글 수정 응답:', data);

      setComments(comments.map(comment =>
        comment.comments_idx === comments_idx ? { ...comment, comment_text: editingText } : comment
      ));

      setEditingComment(null); // 수정 상태 초기화
      setEditingText(''); // 수정 텍스트 초기화
    } catch (error) {
      console.error('에러 발생:', error);
      alert('정보를 수정할 수 없습니다.');
    }
  };

  // 댓글 추가 함수
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
      const response = await axios.post('/api/comments', { text: newComment, user_id });
      setComments([...comments, response.data]); // 새로운 댓글을 기존 댓글에 추가
      setNewComment(''); // 새로운 댓글 입력란 초기화
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // 북마크 토글 함수
  const toggleBookmark = async () => {
    try {
      const url = isBookmarked
        ? 'http://localhost:4000/favorites/remove'
        : 'http://localhost:4000/favorites/add';

      const response = await axios.post(url, {
        user_id,
        foodIdx
      });

      if (!response.data.success) {
        throw new Error(isBookmarked ? '북마크를 제거할 수 없습니다.' : '북마크를 추가할 수 없습니다.');
      }

      setIsBookmarked(!isBookmarked); // 북마크 상태 토글
    } catch (error) {
      console.error('북마크 토글 오류:', error);
      alert('북마크 상태를 변경할 수 없습니다.');
    }
  };


  const fdnm = result.food_name;     // 음식 이름
  const fdvd = "https://www.youtube.com/embed/0gMdr8U4Ruo"; // 닭갈비
  const fdds = result.food_desc;     // 음식 설명
  const fdrp = result.food_recipe;   // 음식 레시피
  const fdim = result.ingre_img;     // 음식 이미지

  console.log('댓글정보:', comments);

  return (
    <div className="DetailPage">
      <TopBar />
      <div className="detail-container">
        <div className={`image-section ${imageLoaded ? 'image-loaded' : ''}`}>
          <img
            className="DakGalbi"
            alt="DakGalbi"
            src='/static/img/DakGalbi.jpg'
          
          />
          <div className="title-group">
            <div className="title-section">
              <h2>{fdnm}</h2>
              <p>{fdds}</p>
            </div>
          </div>
        </div>
        <div className="bookmark-section">
          <img
            className="bookmark-icon"
            src={isBookmarked ? filledHeart : emptyHeart}
            alt="Bookmark"
            onClick={toggleBookmark}
            onError={(e) => console.error('이미지 로드 실패:', e)}
          />
        </div>

        <div className="video-section">
          {fdvd ? (
            <iframe
              className="video-iframe"
              src={fdvd}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          ) : (
            <div className="video-placeholder">영상이 없습니다</div>
          )}
        </div>

        <div className="description-section">
          <h2>상세 설명</h2>
          <div dangerouslySetInnerHTML={{ __html: fdrp }} />
        </div>

        <div className="comments-section">
          <h2>Review</h2>
          <hr className="review-underline" />
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-box">
                <div className="comment-header">
                  <span>{comment.user_id}</span>
                </div>
                <div className="comment-content">
                  {comment.comment_text}
                </div>
                {comment.user_id === user_id && (
                  editingComment === comment.id ? (
                    <div>
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="내용을 입력해주세요"
                      />
                      <button onClick={() => mocomts(comment.comments_idx)}>수정</button>
                      <button onClick={() => {
                        setEditingComment(null);
                        setEditingText('');
                      }}>취소</button>
                    </div>
                  ) : (
                    <div className="comment-actions">
                      <button onClick={() => {
                        setEditingComment(comment.id);
                        setEditingText('');
                      }}>
                        수정
                      </button>
                      <button onClick={() => delcomts(comment.comments_idx)}>삭제</button>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="comment-input-container">
            <textarea
              className="comment-input"
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="comment-button" onClick={handleAddComment}>
              등록
            </button>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default DetailPage;
