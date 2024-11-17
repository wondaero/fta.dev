import '../assets/person-style.scss';

function Person({ onClickHandler, styleCode }) {

  const style1 = {
    hat: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'none'],
    cloth: ['c1', 'c2', 'c3', 'c4'],
    glass: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'none'],
    tie: ['t1', 't2', 't3', 't4', 't5', 't6', 'none'],
  }

  return (
    <div className="person" onClick={ onClickHandler }>
      <div className="head"></div>
      <div className="body"></div>
      <div className={`hat ${style1.hat[styleCode[0]]}`}></div>
      <div className={`cloth ${style1.cloth[styleCode[1]]}`}></div>
      <div className={`glass ${style1.glass[styleCode[2]]}`}></div>
      <div className={`tie ${style1.tie[styleCode[3]]}`}></div>
    </div>
  );
}

export default Person;
