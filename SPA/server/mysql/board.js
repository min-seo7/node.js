//실행할 쿼리.
//전체글목록, 글등록 게시글 단건조회(상세) + 댓글목록, 글수정

module.exports = {
  //게시글전체목록
  boardList: {
    query: `select no, title, writer, date_format(created_date, '%Y-%m-%d') as created_date from t_board_board order by no desc;`,
  },
  //게시글상세
  boardDetail: { query: `select * from t_board_board where no = ?` },
  //해당 게시글의 댓글목록
  commentList: {
    query: `select content, writer, date_format(created_date, '%Y-%m-%d') as created_date from t_comment_board where bno = ?`,
  },
  //글등록
  insertBoard: {
    query: `insert into t_board_board (title, writer, content) values (?, ?, ?)`,
  },
  //글수정 [글번호 파라미터로 넘겨서 -> 제목&내용수정]
  updateBoard: {
    query: `update t_board_board set title = ?, content = ? where no = ?`,
  },
  //댓글수
  commentCount: {
    query: `select count(*) as comment_count from t_comment_board where bno = ?`,
  },
};
