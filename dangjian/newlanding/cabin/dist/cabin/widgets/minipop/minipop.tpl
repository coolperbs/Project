<div class="cabin-widgets-minipop" style="display:none;">
	<div class="J_minipopCont minipop">
	</div>
	<script class="J_minipopTemp" type="text/html">
		<%if(title){%>
			<div class="head">
				<%= title%>
			</div>
			<%}%>
				<%if(msg){%>
					<div class="content">
						<%= msg%>
					</div>
					<%}%>
						<div class="act clearfix">
							<!--按钮默认cancel在左，ok在右-->
							<!--按钮cancel在右，ok在左-->
							<%if(sort&&sort=='right'){%>
								<%if(!cancel&&!ok){%>
									<button class="btn btn-primary" data-type="ok" style="margin:0 5px;">确认</button>
									<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">取消</button>
									<%}else{%>
										<!--配置了取消或确认按钮显示如下-->
										<%if(ok){%>
											<button class="btn btn-primary" data-type="ok" style="margin:0 5px;">
												<%=ok%>
											</button>
											<%}%>
												<%if(!ok&&(typeof ok==='string')){%>
													<button data-type="ok" class="btn btn-primary" style="margin:0 5px;">确认</button>
													<%}%>
														<%if(cancel){%>
															<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">
																<%=cancel%>
															</button>
															<%}%>
																<%if(!cancel&&(typeof cancel==='string')){%>
																	<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">取消</button>
																	<%}%>
																		<%}%>
																			<%}else{%>
																				<!--按钮cancel在左，ok在右-->
																				<!--没有配置取消和确认按钮默认显示如下-->
																				<%if(!cancel&&!ok){%>
																					<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">取消</button>
																					<button class="btn btn-primary" data-type="ok" style="margin:0 5px;">确认</button>
																					<%}else{%>
																						<!--配置了取消或确认按钮显示如下-->
																						<%if(cancel){%>
																							<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">
																								<%=cancel%>
																							</button>
																							<%}%>
																								<%if(!cancel&&(typeof cancel==='string')){%>
																									<button class="btn btn-outline" data-type="cancel" style="margin:0 5px;">取消</button>
																									<%}%>
																										<%if(ok){%>
																											<button class="btn btn-primary" data-type="ok" style="margin:0 5px;">
																												<%=ok%>
																											</button>
																											<%}%>
																												<%if(!ok&&(typeof ok==='string')){%>
																													<button data-type="ok" class="btn btn-primary" style="margin:0 5px;">确认</button>
																													<%}%>
																														<%}%>
																															<%}%>
						</div>
	</script>
	<div class="J_minipopMask mask"></div>
</div>
