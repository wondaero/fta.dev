
import '../App.css';
import '../assets/style.scss';

function InitView({ onClickHandler }) {

  return (
    <div className="init-view">
      <button className="game-start-btn" onClick={ onClickHandler }></button>
      <p>
        돋보기 버튼을 누르면 게임이 시작됩니다.<br/>
        주어진 시간내에 같은 사람을 찾아주세요.<br/>
        <strong className="tip1">*STAGE가 높을수록 시간이 짧음</strong>
      </p>
    </div>
  );
}

export default InitView;
