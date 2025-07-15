<template>
  <div class="container">
    <template v-if="commentCount > 0">
      <p>댓글 목록</p>
      <hr />
      <table class="table table-hover">
        <tbody>
          <tr v-for="commentInfo of commentList" v-bind:key="commentInfo.no">
            <td>{{ commentInfo.content }}</td>
            <td>{{ commentInfo.writer }}</td>
            <td>{{ dateFormat(commentInfo.created_date, "yyyy-MM-dd") }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <p v-else>댓글 없음</p>
  </div>
</template>

<script></script>
