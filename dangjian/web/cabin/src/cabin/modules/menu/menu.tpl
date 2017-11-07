<div class="cabin-menu">
	<div class="logo">CABIN</div>
	<div class="J_menuCont menu-content"></div>
	<script type="text/html" class="J_menuTemp">
		<%if(menuList&&menuList.length>0){%>
			<ul class="menu">
				<%for(var i in menuList){%>
					<li class="menu-list">
						<a class="menu-list-txt" title="<%=menuList[i].name%>">
							<%=menuList[i].name%>
						</a>
						<%if(menuList[i].children&&menuList[i].children.length>0){%>
							<ul>
								<% var childLists=menuList[i].children;%>
									<%for(var j in childLists){%>
										<li class="menu-sublist">
											<a class="menu-sublist-txt" title="<%=childLists[j].name%>" data-url="<%=childLists[j].url%>" data-type="<%=childLists[j].type%>">
												<%=childLists[j].name%>
											</a>
										</li>
										<%}%>
							</ul>
							<%}%>
					</li>
					<%}%>
			</ul>
			<%}%>
	</script>
</div>
