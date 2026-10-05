import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { useToast } from '@/shared/components/ui';
import { NICKNAME_MAX_LENGTH } from '@/shared/constants/nickname';

import { NICKNAME_QUERY_OPTIONS } from './query';

export const useNicknameCheck = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  // 응답을 적용해도 되는 요청인지 구분하는 번호
  const requestVersionRef = useRef(0);

  // 같은 렌더 안에서 연속 클릭해도 중복 요청을 막음
  const isRequestPendingRef = useRef(false);

  useEffect(() => {
    return () => {
      // 화면을 떠난 뒤 도착한 응답은 무시
      requestVersionRef.current += 1;
    };
  }, []);

  const resetNicknameCheck = () => {
    // 진행 중인 요청의 응답도 무효화
    requestVersionRef.current += 1;

    setCheckedNickname(null);
    setNicknameError(null);
  };

  const invalidateNicknameCheck = (message: string) => {
    resetNicknameCheck();
    setNicknameError(message);
  };

  const checkNickname = async (inputNickname: string) => {
    if (isRequestPendingRef.current) {
      return;
    }

    const requestedNickname = inputNickname.trim();

    resetNicknameCheck();

    if (!requestedNickname) {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }

    if (inputNickname.length > NICKNAME_MAX_LENGTH) {
      setNicknameError(
        `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요.`,
      );
      return;
    }

    const requestVersion = requestVersionRef.current;

    isRequestPendingRef.current = true;
    setIsCheckingNickname(true);

    try {
      const result = await queryClient.fetchQuery(
        NICKNAME_QUERY_OPTIONS.CHECK({
          nickname: requestedNickname,
        }),
      );

      // 요청 중 입력이 변경됐다면 이전 결과를 적용하지 않음
      if (requestVersion !== requestVersionRef.current) {
        return;
      }

      if (result.available) {
        // NicknameField가 원본 입력값과 비교하므로 원본을 저장
        setCheckedNickname(inputNickname);
        setNicknameError(null);
      } else {
        setCheckedNickname(null);
        setNicknameError('이미 사용 중인 닉네임입니다.');
      }
    } catch {
      // 이전 입력에 대한 실패 토스트도 표시하지 않음
      if (requestVersion !== requestVersionRef.current) {
        return;
      }

      setCheckedNickname(null);

      showToast('닉네임 중복 확인을 할 수 없어요. 잠시 후 다시 시도해주세요.', {
        variant: 'gray',
      });
    } finally {
      isRequestPendingRef.current = false;
      setIsCheckingNickname(false);
    }
  };

  return {
    checkedNickname,
    nicknameError,
    isCheckingNickname,
    checkNickname,
    resetNicknameCheck,
    invalidateNicknameCheck,
  };
};
