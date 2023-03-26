select author, count(id) as articles, sum(likes) as likes from blogs group by author order by likes desc;
