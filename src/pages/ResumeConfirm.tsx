import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeSmallBtn from '../components/MakeResume/ResumeSmallBtn';
import ResumeLongBtn from '../components/MakeResume/ResumeLongBtn';
import InputField from '../components/MakeResume/InputField';

const ResumeConfirm = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    name: '김상명',
    content:
      '저는 20대부터 부모님을 도와 찻집 일을 시작했고, 이후 30대부터는 부암동에서 전통 다방을 25년간 운영하며 손님들과 깊은 유대감을 쌓아왔습니다. 이 경험을 통해 사람을 대하는 법, 지역 사회와 함께하는 법을 자연스럽게 배웠습니다. 특히 부암동 문화행사에 참여하며 전통차를 소개하거나 주민들과 함께 전시 공간을 만들었던 경험은 협업의 즐거움을 느낄 수 있던 시간이었습니다. 상업고등학교를 졸업한 이후 실무 중심의 삶을 살아왔지만, 장사를 하며 익힌 경영 감각과 손님 응대 능력은 누구보다 자랑할 수 있습니다. 저는 사람들의 이야기를 잘 듣고 편안하게 만들어주는 것이 강점이며, 기술에는 아직 익숙하지 않지만 배우려는 의지가 있습니다. 이제는 제 경험을 살려 지역 사회를 위해 도움이 되는 역할을 하고 싶습니다. 저는 20대부터 부모님을 도와 찻집 일을 시작했고, 이후 30대부터는 부암동에서 전통 다방을 25년간 운영하며 손님들과 깊은 유대감을 쌓아왔습니다. 이 경험을 통해 사람을 대하는 법, 지역 사회와 함께하는 법을 자연스럽게 배웠습니다. 특히 부암동 문화행사에 참여하며 전통차를 소개하거나 주민들과 함께 전시 공간을 만들었던 경험은 협업의 즐거움을 느낄 수 있던 시간이었습니다. 상업고등학교를 졸업한 이후 실무 중심의 삶을 살아왔지만, 장사를 하며 익힌 경영 감각과 손님 응대 능력은 누구보다 자랑할 수 있습니다. 저는 사람들의 이야기를 잘 듣고 편안하게 만들어주는 것이 강점이며, 기술에는 아직 익숙하지 않지만 배우려는 의지가 있습니다. 이제는 제 경험을 살려 지역 사회를 위해 도움이 되는 역할을 하고 싶습니다저는 20대부터 부모님을 도와 찻집 일을 시작했고, 이후 30대부터는 부암동에서 전통 다방을 25년간 운영하며 손님들과 깊은 유대감을 쌓아왔습니다. 이 경험을 통해 사람을 대하는 법, 지역 사회와 함께하는 법을 자연스럽게 배웠습니다. 특히 부암동 문화행사에 참여하며 전통차를 소개하거나 주민들과 함께 전시 공간을 만들었던 경험은 협업의 즐거움을 느낄 수 있던 시간이었습니다. 상업고등학교를 졸업한 이후 실무 중심의 삶을 살아왔지만, 장사를 하며 익힌 경영 감각과 손님 응대 능력은 누구보다 자랑할 수 있습니다. 저는 사람들의 이야기를 잘 듣고 편안하게 만들어주는 것이 강점이며, 기술에는 아직 익숙하지 않지만 배우려는 의지가 있습니다. 이제는 제 경험을 살려 지역 사회를 위해 도움이 되는 역할을 하고 싶습니다저는 20대부터 부모님을 도와 찻집 일을 시작했고, 이후 30대부터는 부암동에서 전통 다방을 25년간 운영하며 손님들과 깊은 유대감을 쌓아왔습니다. 이 경험을 통해 사목',
  });
  const [isEdit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
    setIsEditing(true);
  };

  const handleTextChange = (text: string) => {
    setData(prev => ({
      ...prev,
      content: text,
    }));
  };

  const handleClick = () => {
    navigate('/resume/start'); // 이력서 작성 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center h-full mt-16">
      <div className="flex flex-col items-center justify-start gap-6 w-[894px] max-w-full bg-stone-100 rounded-[10px] px-30 py-20 h-fit min-h-[400px]">
        <h2 className="text-neutral-700 text-4xl font-bold w-full text-start">
          {data.name}님 자기소개서
        </h2>
        {isEdit ? (
          <InputField
            inputData={data.content}
            size={'w-full h-80'}
            handleChange={handleTextChange}
          />
        ) : (
          <p className="text-neutral-700 text-lg leading-relaxed text-justify w-full ">
            {data.content}
          </p>
        )}
        {isEditing ? (
          <ResumeLongBtn
            btnName="수정 완료"
            onClick={() => {
              setIsEditing(false);
              setEdit(false);
            }}
          />
        ) : (
          <div className="flex gap-4 w-full">
            <ResumeSmallBtn
              name="다시하기"
              clickEvent={handleClick}
              color={true}
            />
            <ResumeSmallBtn
              name="수정하기"
              clickEvent={handleEdit}
              color={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeConfirm;
