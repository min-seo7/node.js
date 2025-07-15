<template>
  <div class="container">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th style="width: 10%">번호</th>
          <td style="width: 15%">{{ boardDetail.no }}</td>
          <th style="width: 10%">작성일</th>
          <td style="width: 25%">{{ boardDetail.created_date }}</td>
          <th style="width: 10%">이름</th>
          <td style="width: 30%">{{ boardDetail.writer }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="5">{{ boardDetail.title }}</td>
        </tr>
        <tr>
          <td colspan="6">
            <div>{{ boardDetail.content }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center">
      <button><a @click="goToUpdate(boardDetail.no)">수정</a></button>
    </div>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th colspan="6" style="text-align: center">댓글목록</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 80%">댓글내용</td>
            <td style="width: 10%">작성자</td>
            <td style="width: 10%">작성일자</td>
          </tr>
          <tr v-if="commentList.length == 0">
            <td colspan="3" style="text-align: center">
              <strong>댓글없음</strong>
            </td>
          </tr>
          <tr v-else :key="i" v-for="(comment, i) in commentList">
            <td style="width: 70%">{{ comment.content }}</td>
            <td style="width: 10%">{{ comment.writer }}</td>
            <td style="width: 20%">{{ comment.created_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boardNo: 0,
      boardDetail: [],
      commentList: [],
    };
  },
  methods: {
    async getBoardDetail() {
      let board = await this.$api("/api/boardDetail", {
        param: [this.boardNo],
      });
      this.boardDetail = board[0];
    },
    async getCommentList() {
      this.commentList = await this.$api("/api/commentList", {
        param: [this.boardNo],
      });
    },
    goToUpdate(boardNo) {
      this.$router.push({
        name: "boardUpdate",
        query: { boardNo: boardNo },
      });
    },
  },
  mounted() {
    //console.log(this.$route.query.board_no); url로 넘어온 글번호
    this.boardNo = this.$route.query.board_no;
    this.getBoardDetail();
    this.getCommentList();
  },
};
</script>
