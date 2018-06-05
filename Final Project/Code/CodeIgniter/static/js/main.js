$(function(){
    $( "#homeInput" ).autocomplete({
        source: "hint.php",
        minLength: 1,
    });
});


function fillAuthorResultTable(data)
{
	$("#authorResultTable").find(".dataRow").each(function(index,el){
		if(index>=data["itemNum"]){
			$(this).hide();
			console.log(index+"Hidden");
		}else{
			$(this).show();
			$(this).children(".PaperNum").text(data["searchResult"][index]["paperNum"]);
			$(this).children(".AuthorName").children("a").attr("href","/author/"+data["searchResult"][index]["authorID"]);
			$(this).children(".AuthorName").children("a").text(data["searchResult"][index]["authorName"]);
			$(this).children(".AffiliationName").find("a").attr("href","/affiliation/"+data["searchResult"][index]["affiliationID"]);
			$(this).children(".AffiliationName").find("a").text(data["searchResult"][index]["affiliationName"]);
		}			
	});
	$("#authorCurrentPage").text(authorCurrentPage);
}

function fillPaperResultTable(data)
{
	$("#paperResultTable").find(".dataRow").each(function(index){
		if(index>=data["itemNum"]){
			$(this).hide();
		}else{
			$(this).show();
			var singlePaper=data["searchResult"][index];
			$(this).children(".paperPublishYear").text(singlePaper["paperPublishYear"]);
			$(this).children(".paperCitations").text(singlePaper["citations"]);
			$(this).children(".paperTitle").children("a").attr("href","/paper/"+singlePaper["paperID"]);
			$(this).children(".paperTitle").children("a").text(singlePaper["title"]);
			$(this).children(".paperConference").children("a").attr("href","/paper/"+singlePaper["conferenceID"]);
			$(this).children(".paperConference").children("a").text(singlePaper["conferenceName"]);
			$(this).children(".paperAuthors").children("ol").empty();
			var authors=singlePaper["authors"];
			for(i = 0,len=authors.length;i<len;i++){
				var content='<a href="/author/"'+authors[i]["authorID"]+'">'+authors[i]["authorName"]+'</a>';
				$(this).children(".paperAuthors").children("ol").append("<li>"+content+"</li>");
			}
		}
	});
	$("#paperCurrentPage").text(paperCurrentPage);
}


function fillConferenceResultTable(data)
{
	$("#conferenceResultTable").find(".dataRow").each(function(index){
		if(index>=data["itemNum"]){
			$(this).hide();
		}else{
			$(this).show();
			var singleConf=data["searchResult"][index];
			$(this).children(".conferenceName").children("a").attr("href","/conference/"+singleConf["conferenceID"]);
			$(this).children(".conferenceName").children("a").text(singleConf["conferenceName"]);
			$(this).children(".conferencePaperNum").text(singleConf["paperNum"]);
			$(this).children(".conferenceAuthorNum").text(singleConf["authorNum"]);
			$(this).children(".conferenceInfluence").text(singleConf["influence"]);
		}
	});
	$("#conferenceCurrentPage").text(conferenceCurrentPage);
}

function fillAffiliationResultTable(data)
{
	$("#affiliationResultTable").find(".dataRow").each(function(index){
		if(index>=data["itemNum"]){
			$(this).hide();
		}else{
			$(this).show();
			var singleAff=data["searchResult"][index];
			$(this).children(".affiliationName").children("a").attr("href","/affiliation/"+singleAff["affiliationID"]);
			$(this).children(".affiliationName").children("a").text(singleAff["affiliationName"]);
			$(this).children(".affilaitionPaperNum").text(singleAff["paperNum"]);
			$(this).children(".affiliationAuthorNum").text(singleAff["authorNum"]);
			$(this).children(".affiliationInfluence").text(singleAff["influence"]);
		}
	});
	$("#affiliationCurrentPage").text(affiliationCurrentPage);

}

function fillAuthorPagePaperTable(data)
{
	$("#authorPapersTable").find(".dataRow").each(function(index){
		if(index>=data["itemNum"]){
			$(this).hide();
		}else{
			$(this).show();
			var singlePaper=data["papers"][index];
			$(this).children(".authorPaperTitle").children("a").attr("href","/paper/"+singlePaper["paperID"]);
			$(this).children(".authorPaperTitle").children("a").text(singlePaper["paperTitle"]);
			$(this).children(".authorPaperPublishYear").text(singlePaper["paperPublishYear"]);
			$(this).children(".authorPaperConference").children("a").attr("href","/conference/"+singlePaper["conferenceID"]);
			$(this).children(".authorPaperConference").children("a").text(singlePaper["conferenceName"]);
			$(this).children(".authorPaperCitations").text(singlePaper["citation"]); //notice: in API, it has no 's'
			$(this).children(".authorPaperAuthors").children("ol").empty();
			var authors=singlePaper["authors"];
			for(var i=0,len=authors.length;i!=len;i++){
				var content='<a href="/author/'+authors[i]["subAuthorID"]+'">'+authors[i]["subAuthorName"]+'</a>';
				$(this).children(".authorPaperAuthors").children("ol").append("<li>"+content+"</li>");
			}
		}
	});
	$("#authorPageCurrentPage").text(authorPageCurrentPage);
}


function checkButtonStatus(prefix)
{
	$("#"+prefix+"ResultPrev").attr("disabled",eval(prefix+"CurrentPage")<=1);
	$("#"+prefix+"ResultNext").attr("disabled",eval(prefix+"CurrentPage")>=eval(prefix+"MaxPage"));
	console.log(eval(prefix+"CurrentPage")<=1);
	console.log(eval(prefix+"CurrentPage")>=eval(prefix+"MaxPage"));
}

$(function(){
	$("#authorResultNext").click(function(){
		if(authorCurrentPage<authorMaxPage){
			var authorNextPage=authorCurrentPage+1;
			var authorTargetUrl=[authorApiUrl,query,authorNextPage.toString(),authorPageSize.toString()].join('/');
			console.log(authorTargetUrl);
			$.getJSON(authorTargetUrl,function(data){
				authorCurrentPage=authorNextPage;
				fillAuthorResultTable(data);
				checkButtonStatus("author");
			});
		}
})
});

$(function(){
	$("#paperResultNext").click(function(){
		if(paperCurrentPage<paperMaxPage){
			var paperNextPage=paperCurrentPage+1;
			var paperTargetUrl=[paperApiUrl,query,paperNextPage.toString(),paperPageSize.toString()].join('/');
			console.log(paperTargetUrl);
			$.getJSON(paperTargetUrl,function(data){
				paperCurrentPage=paperNextPage;
				fillPaperResultTable(data);
				checkButtonStatus("paper");
			});
		}
})
});

$(function(){
	$("#conferenceResultNext").click(function(){
		if(conferenceCurrentPage<conferenceMaxPage){
			var conferenceNextPage=conferenceCurrentPage+1;
			var conferenceTargetUrl=[conferenceApiUrl,query,conferenceNextPage.toString(),conferencePageSize.toString()].join('/');
			console.log(conferenceTargetUrl);
			$.getJSON(conferenceTargetUrl,function(data){
				conferenceCurrentPage=conferenceNextPage;
				fillConferenceResultTable(data);
				checkButtonStatus("conference");
			});
		}
})
});

$(function(){
	$("#affiliationResultNext").click(function(){
		if(affiliationCurrentPage<affiliationMaxPage){
			var affiliationNextPage=affiliationCurrentPage+1;
			var affiliationTargetUrl=[affiliationApiUrl,query,affiliationNextPage.toString(),affiliationPageSize.toString()].join('/');
			console.log(affiliationTargetUrl);
			$.getJSON(affiliationTargetUrl,function(data){
				affiliationCurrentPage=affiliationNextPage;
				fillAffiliationResultTable(data);
				checkButtonStatus("affiliation");
			});
		}
})
});

$(function(){
	$("#authorPageResultNext").click(function(){
		if(authorPageCurrentPage<authorPageMaxPage){
			var authorPageNextPage=authorPageCurrentPage+1;
			var authorPageTargetUrl=[authorPageApiUrl,authorID,authorPageNextPage.toString(),authorPagePageSize.toString()].join('/');
			console.log(authorPageTargetUrl);
			$.getJSON(authorPageTargetUrl,function(data){
				authorPageCurrentPage=authorPageNextPage;
				fillAuthorPagePaperTable(data);
				checkButtonStatus("authorPage");
			});
		}
})
});

$(function(){
	$("#authorResultPrev").click(function(){
		if(authorCurrentPage>1){
			var authorPrevPage=authorCurrentPage-1;
			var authorTargetUrl=[authorApiUrl,query,authorPrevPage.toString(),authorPageSize.toString()].join('/');
			console.log(authorTargetUrl);
			$.getJSON(authorTargetUrl,function(data){
				authorCurrentPage=authorPrevPage;
				fillAuthorResultTable(data);
				checkButtonStatus("author");
			});
		}
})
});

$(function(){
	$("#paperResultPrev").click(function(){
		if(paperCurrentPage>1){
			var paperPrevPage=paperCurrentPage-1;
			var paperTargetUrl=[paperApiUrl,query,paperPrevPage.toString(),paperPageSize.toString()].join('/');
			console.log(paperTargetUrl);
			$.getJSON(paperTargetUrl,function(data){
				paperCurrentPage=paperPrevPage;
				fillPaperResultTable(data);
				checkButtonStatus("paper");
			});
		}
})
});
$(function(){
	$("#conferenceResultPrev").click(function(){
		if(conferenceCurrentPage>1){
			var conferencePrevPage=conferenceCurrentPage-1;
			var conferenceTargetUrl=[conferenceApiUrl,query,conferencePrevPage.toString(),conferencePageSize.toString()].join('/');
			console.log(conferenceTargetUrl);
			$.getJSON(conferenceTargetUrl,function(data){
				conferenceCurrentPage=conferencePrevPage;
				fillConferenceResultTable(data);
				checkButtonStatus("conference");
			});
		}
})
});
$(function(){
	$("#affiliationResultPrev").click(function(){
		if(affiliationCurrentPage>1){
			var affiliationPrevPage=affiliationCurrentPage-1;
			var affiliationTargetUrl=[affiliationApiUrl,query,affiliationPrevPage.toString(),affiliationPageSize.toString()].join('/');
			console.log(affiliationTargetUrl);
			$.getJSON(affiliationTargetUrl,function(data){
				affiliationCurrentPage=affiliationPrevPage;
				fillAffiliationResultTable(data);
				checkButtonStatus("affiliation");
			});
		}
})
});

$(function(){
	$("#authorPageResultPrev").click(function(){
		if(authorPageCurrentPage>1){
			var authorPagePrevPage=authorPageCurrentPage-1;
			var authorPageTargetUrl=[authorPageApiUrl,authorID,authorPagePrevPage.toString(),authorPagePageSize.toString()].join('/');
			console.log(authorPageTargetUrl);
			$.getJSON(authorPageTargetUrl,function(data){
				authorPageCurrentPage=authorPagePrevPage;
				fillAuthorPagePaperTable(data);
				checkButtonStatus("authorPage");
			});
		}
})
});

