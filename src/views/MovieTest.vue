<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<template>

</template>

<style scoped lang="scss">
span, button, p, label, select {
  font-family: "Montserrat", sans-serif, sans-serif, "M PLUS 1";
  color: #557;
  font-size: 18px;
}

small {
  font-family: "Montserrat", sans-serif, sans-serif, "M PLUS 1";
  color: #557;
}

span, button {
  margin: 10px 10px 10px 0;
}
.col-md-8 {
  width: 50vw;
  margin: 0 auto;
  align-items: start;
  justify-content: start;
  text-align: start;
}
.card {
  margin-bottom: 10px;

  .card-body {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-link {
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
  }

  .btn-primary, .btn-outline-primary {
    margin-right: 10px;
  }

  .text-muted {
    margin-left: auto;
  }

  textarea {
    resize: vertical;
  }

  .mt-2 {
    margin-top: 10px;
  }
}
</style>
