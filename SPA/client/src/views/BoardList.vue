<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <td>No.</td>
          <td>제목</td>
          <td>작성자</td>
          <td>작성일자</td>
          <td>댓글 수</td>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(board, i) in boardList">
          <td>{{ board.no }}</td>
          <td>
            <a @click="goToDetail(board.no)">{{ board.title }}</a>
          </td>
          <td>{{ board.writer }}</td>
          <td>{{ board.created_date }}</td>
          <td>{{ board.commetCnt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boardList: [],
    };
  },
  methods: {
    async getBoardList() {
      this.boardList = await this.$api("/api/boardList", {});
      for (let board in this.boarList) {
        let commetCnt = this.getCommentCount(board.no);
        console.log(commetCnt);
        board.commetCnt = commetCnt;
      }
    },
    async getCommentCount(boardNo) {
      const res = await this.$api("/api/commentCount", { boardNo });
      return res.count || 0;
    },
    goToDetail(board_no) {
      this.$router.push({
        name: "boardDetail",
        query: { board_no },
      });
    },
  },
  mounted() {
    this.getBoardList();
  },
};
</script>
