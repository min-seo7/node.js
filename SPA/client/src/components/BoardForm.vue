<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th class="text-right">No.</th>
          <td class="text-center">
            <slot name="no"></slot>
          </td>
        </tr>
        <tr>
          <th class="text-right">제목</th>
          <td class="text-center">
            <slot name="title">{{ title }}</slot>
          </td>
        </tr>
        <tr>
          <th class="text-right">작성자</th>
          <td class="text-center">
            <slot name="writer"></slot>
          </td>
        </tr>
        <tr>
          <th class="text-right">내용</th>
          <td class="text-center">
            <slot name="content">{{ content }}</slot>
          </td>
        </tr>
        <tr>
          <th class="text-right">작성일자</th>
          <td class="text-center">
            <slot name="created_date"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: { type: String },
    content: { type: String },
  },
};
</script>
