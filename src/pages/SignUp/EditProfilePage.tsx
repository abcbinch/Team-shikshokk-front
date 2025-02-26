import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'; // 헤더 임포트
import axios from 'axios'; // Axios 임포트
import '../../styles/EditProfilePage.scss';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    businessType: '',
    storeAddress: '',
    representativeName: '',
    businessRegistrationNumber: '',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [membershipType, setMembershipType] = useState<
    'individual' | 'business'
  >('individual'); // 기본값 설정
  const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 사진 상태 추가

  // 사용자 데이터 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8082/api-server/me',
          {
            withCredentials: true,
          },
        );

        console.log('사용자 데이터:', response.data); // 응답 데이터 확인
        console.log('회원 유형:', response.data.membershipType); // 회원 유형 확인

        setFormData(response.data);
        setMembershipType(response.data.membershipType); // 회원 유형에 따라 설정

        // 기업회원일 경우 추가 입력란을 기본적으로 설정
        if (response.data.membershipType === 'business') {
          setFormData(prev => ({
            ...prev,
            companyName: response.data.companyName || '',
            businessType: response.data.businessType || '',
            storeAddress: response.data.storeAddress || '',
            representativeName: response.data.representativeName || '',
            businessRegistrationNumber:
              response.data.businessRegistrationNumber || '',
          }));
        }
      } catch (error) {
        console.error('사용자 데이터 로드 오류:', error);
        alert('사용자 데이터를 로드하는 데 오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 이메일 유효성 검사
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('유효하지 않은 이메일 형식입니다.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]); // 선택한 파일 저장
    }
  };

  const handleMembershipChange = (type: 'individual' | 'business') => {
    setMembershipType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (newPassword && confirmPassword) {
      if (newPassword.length < 8 || newPassword.length > 16) {
        setPasswordError('비밀번호는 8-16자 이내여야 합니다.');
        return;
      } else if (
        !/[a-z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword) ||
        !/[!@#$%^&*]/.test(newPassword)
      ) {
        setPasswordError(
          '비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.',
        );
        return;
      } else if (newPassword !== confirmPassword) {
        alert('새 비밀번호 확인이 틀립니다.');
        return;
      } else {
        setPasswordError('');
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('currentPassword', currentPassword);
    formDataToSend.append('newPassword', newPassword);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('membershipType', membershipType);

    // 기업회원 추가 데이터
    if (membershipType === 'business') {
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('businessType', formData.businessType);
      formDataToSend.append('storeAddress', formData.storeAddress);
      formDataToSend.append('representativeName', formData.representativeName);
      formDataToSend.append(
        'businessRegistrationNumber',
        formData.businessRegistrationNumber,
      );
    }

    // 프로필 사진 추가
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    try {
      // axios PUT 요청
      const response = await axios.put(
        'http://localhost:8082/api-server/update',
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송을 위한 헤더
          },
        },
      );

      console.log('회원 정보 수정 성공:', response.data);
      alert('회원 정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('회원 정보 수정 오류:', error.response?.data);
        alert(
          `회원 정보 수정 중 오류가 발생했습니다: ${
            error.response?.data.message || error.message
          }`,
        );
      } else {
        console.error('회원 정보 수정 오류:', error);
        alert('회원 정보 수정 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="edit-profile-page">
      <Header />
      <h1>회원정보 수정</h1>
      <div className="edit-profile-container">
        <div className="membership-type">
          <button
            onClick={() => handleMembershipChange('individual')}
            className={membershipType === 'individual' ? 'active' : ''}
          >
            개인회원
          </button>
          <button
            onClick={() => handleMembershipChange('business')}
            className={membershipType === 'business' ? 'active' : ''}
          >
            기업회원
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>프로필 사진</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
          <div className="form-group">
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
              required
            />
          </div>

          {/* 비밀번호 수정 입력란 */}
          <div className="form-group">
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력해주세요"
              required
            />
          </div>
          <div className="form-group">
            <label>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="비밀번호(8-16자 이내, 소문자, 특수문자)"
              required
            />
          </div>
          <div className="form-group">
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호를 다시 입력해주세요"
              required
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          {/* 휴대폰 번호 및 주소 입력란 */}
          <div className="form-group">
            <label>휴대폰 번호</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>
          <div className="form-group">
            <label>주소</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="주소를 입력해주세요"
              required
            />
          </div>

          {/* 기업회원 추가 입력란 */}
          {membershipType === 'business' && (
            <>
              <div className="form-group-inline">
                <div className="inline-input">
                  <label>가게명</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="가게명을 입력해주세요"
                    required
                  />
                </div>
                <div className="inline-input">
                  <label>업종</label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    placeholder="업종을 입력해주세요"
                    required
                  />
                </div>
              </div>
              <div className="form-group-inline">
                <div className="inline-input">
                  <label>가게 주소</label>
                  <input
                    type="text"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    placeholder="가게 주소를 입력해주세요"
                    required
                  />
                </div>
                <div className="inline-input">
                  <label>대표자명</label>
                  <input
                    type="text"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleChange}
                    placeholder="대표자명을 입력해주세요"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>사업자 등록증 번호</label>
                <input
                  type="text"
                  name="businessRegistrationNumber"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  placeholder="사업자 등록증 번호를 입력해주세요"
                  required
                />
              </div>
            </>
          )}

          <button type="submit">수정하기</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
