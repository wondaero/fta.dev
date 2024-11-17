
import '../App.css';
import '../assets/style.scss';

function InitView({ onClickHandler }) {

  return (
    <div className="init-view">
      <button className="game-start-btn" onClick={ onClickHandler }></button>
      <p>
        돋보기 버튼을 누르면 게임이 시작됩니다.<br/>
        30초 안에 최대한 많이 찾아주세요.
      </p>
    </div>
  );
}

export default InitView;
