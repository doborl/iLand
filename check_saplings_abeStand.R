
# I am marcoj

rm(list=ls())
library(RSQLite)
library(fields)
library(ggplot2)
library(gridExtra)
library(dplyr)
library(cowplot)

#2021.10.26.
# Check the results of a testrun that aim to test the management. Look specific stand ids, and corresponding RU pixels.

# set the dataroot to the output folder:

dataroot<-"D:/_iLand_SK_region/run/TEST_folder/output/"

file1<-paste0(dataroot,"subregion_medium_test3.sqlite")



# ----------------------------------------------------------- READ IN THE DATA:

sqlite.driver <- dbDriver("SQLite")
db1 <- dbConnect(sqlite.driver, dbname = file1)
tables.in.the.file<-dbListTables(db1)
print(tables.in.the.file)

# READ IN the datatables:
abestand <- dbReadTable(db1,"abeStand")
abestand.removal <- dbReadTable(db1,"abeStandRemoval")
abestand.detail <- dbReadTable(db1,"abeStandDetail")
abeUnit <- dbReadTable(db1,"abeUnit")
stand <- dbReadTable(db1,"stand")
sapling <- dbReadTable(db1,"sapling")
dynamicstand <- dbReadTable(db1,"dynamicstand")
dbDisconnect(db1)

summary(abestand.removal)
harvest.rates<-data.frame (abestand.removal %>% summarise(volumeThinning=sum(volumeThinning), 
                                                        volumeFinal=sum(volumeFinal), 
                                                        volumeSalvaged=sum(volumeSalvaged), 
                                                        volumeDisturbed=sum(volumeDisturbed)))
 head(abeUnit)
plot(abeUnit$realizedHarvest)
plot(abeUnit$finalHarvest)
                    
all.harvest<-data.frame(abeUnit[,c(13:15)])       
whole.sim.avg<-apply(all.harvest,2,mean)    #m3/ha/year on average of the whole simulations
print(whole.sim.avg)

colors<-c("orange","limegreen","tomato","skyblue")
toplot<-t(all.harvest)
colnames(toplot)<-abeUnit$year
barplot(toplot, col=colors, main="Whole landscape thinnings and harvests m3/ha/year", ylim=c(0,40), ylab="Removed volume m3/ha/year", xlab="years")

text(20,38,paste("Final harvest:",round(whole.sim.avg[1], 2), " m3/ha/year"))
text(20,35,paste("Thinnings:",round(whole.sim.avg[2], 2), " m3/ha/year"))
legend("top", c("finalcut", "thinning/regcut","salvaged"), cex=1, bty="n", fill=colors, text.font=2)


#---------------- THE STAND 51 IS A BIG STAND, AND THE RU 2574 IS ONE 100X100M PIXEL INSIDE THIS STAND.

 # SET HERE HOW MANY STAND YOU WANT TO PLOT , PDF WILL BE CREATED FOR EACH STAND SEPARATELY.
# NOTE THAT MYRUS- HAVE TO HAVE THE SAME AMOUNT OF ELEMENTS, AND HAVE TO BE INSIDE THE STAND.
# CAN CHECK ON THE MAP OF ILAND, IT IS THE INDEX NUMBER OF THE RESOURCE UNITS.

mystands<-c(51,1198,756, 286)
myrus<-c(2574,331,3102,1377)



for (cases in 1:length(mystands)) {
  mystand<-mystands[cases]
  myru<-myrus[cases]

outputfilename<-"NOplanting_regcut60percent_clearolderthat80"
pdf(paste0(dataroot,outputfilename,"__",mystand,"__",myru,".pdf"), height = 10,width=12)


colors<-c("orange","limegreen","tomato","skyblue")
toplot<-t(all.harvest)
colnames(toplot)<-abeUnit$year
barplot(toplot, col=colors, main="Whole landscape thinnings and harvests m3/ha/year", ylim=c(0,40), ylab="Removed volume m3/ha/year", xlab="years")

text(20,38,paste("Final harvest:",round(whole.sim.avg[1], 2), " m3/ha/year"))
text(20,35,paste("Thinnings:",round(whole.sim.avg[2], 2), " m3/ha/year"))
legend("top", c("finalcut", "thinning/regcut","salvaged"), cex=1, bty="n", fill=colors, text.font=2)



#----------------------------------------------------------FILTER OUT THE OUTPUTS TO THIS STAND AND RU PIXEL:
abestand1<-filter(abestand,standid==mystand)
abestand.removal1<-filter(abestand.removal,standid==mystand)
abestand.detail1<-filter(abestand.detail, standid==mystand)
sapling1<-filter(sapling, ru==myru)
dynamicstand1<-filter(dynamicstand, ru==myru)
stand1<-filter(stand, ru==myru)

number.of.activites<-nrow(abestand.removal1)
nyears<-max(stand1$year)
removals<-data.frame(year=c(1:nyears),volumeThinning=0 , volumeFinal=0, volumeSalvaged=0,volumeDisturbed=0 )
tofill<-match(abestand.removal1$year,removals$year)

removals$volumeThinning[tofill] <-abestand.removal1$volumeThinning
removals$volumeFinal[tofill]    <-abestand.removal1$volumeFinal
removals$volumeSalvaged[tofill] <-abestand.removal1$volumeSalvaged
removals$volumeDisturbed[tofill]<-abestand.removal1$volumeDisturbed
print(removals)
#---------------------------------------------START TO MAKE PLOTS
names<-colnames(abestand)
set.panel(3,2)
par(mar=c(4,4,4,6))
colors<-c("limegreen","orange","tomato","skyblue")
plot(abestand1$year,abestand1[,6], typ="l",lwd=3, ylab=names[6], xlab="years",main=paste("standid=",abestand1$standid[1],",",names[1] ))
par(new=TRUE)
barplot(t(removals[,-1]),xlab = "",ylab = "",xaxt="n",yaxt="n",ylim=c(0,800), col = colors)
yticks<-pretty(c(0,800) )
axis(side=4, at = yticks, labels = yticks,las=2 )

ytitle2<-expression(paste("Removed volume"))
mtext(ytitle2, side=4, line=3, at=400, cex=0.8)#,cex.lab=0.02)
legend("right", c( "thinning/regcut","finalcut","salvaged", "disturbed"), cex=1, bty="n", fill=colors, text.font=2)


for (i in 7:ncol(abestand)) {
  plot(abestand1$year,abestand1[,i], typ="l",lwd=3, ylab=names[i], xlab="years",main=paste("standid=",abestand1$standid[1],",",names[i] ))

}

tending<-which(abestand.removal1$activity=="clearcut_sw"&abestand.removal1$volumeFinal==0)
abestand.removal1$activity[tending]<-"tending"
print(abestand.removal1)
############################################################# WORK WITH THE DYNAMICSTAND OUTPUT #######################

species<-unique(dynamicstand1$species)

print("We have these species on this RU:")
print(species)


print(colnames(dynamicstand1))
#----------------------------------------------------------------------------AGE >>>
g.age<-ggplot(dynamicstand1, (aes(year)))+
  ggtitle(paste("AGE at RU=", myru))+
  ylab("AGE mean +- min and max")+
  geom_ribbon(aes(ymin = age_min, ymax = age_max), fill = "yellow") +
  geom_line(aes( y=age_mean), size=1.3)+
  geom_line(aes( y=age_mean+age_sd), size=1, lty=3)+
  geom_line(aes( y=age_mean-age_sd), size=1, lty=3)+
  facet_wrap(~species)+
  theme_bw() 


for (nn in 1:number.of.activites){
  g.age<-g.age+geom_vline(xintercept =abestand.removal1$year[nn], col="limegreen", size=0.5,lty=2)+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=100, label=abestand.removal1$activity[nn], color="red", angle=90)
}

#----------------------------------------------------------------------------DBH >>>
g.dbh<-ggplot(dynamicstand1, (aes(year)))+
  ggtitle(paste("DBH at RU=", myru))+
  ylab("DBH mean +- sd")+
  geom_ribbon(aes(ymin = dbh_p5, ymax = dbh_p95), fill = "yellow") +
  geom_line(aes( y=dbh_mean), size=1.3)+
  geom_line(aes( y=dbh_mean+dbh_sd), size=1, lty=3)+
  geom_line(aes( y=dbh_mean-dbh_sd), size=1, lty=3)+
  facet_wrap(~species)+
  theme_bw() 

for (nn in 1:number.of.activites){
  g.dbh<-g.dbh+geom_vline(xintercept =abestand.removal1$year[nn], col="limegreen", size=0.5,lty=2)+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=80, label=abestand.removal1$activity[nn], color="red", angle=90)
}


#----------------------------------------------------------------------------HEIGHT >>>
g.height<-ggplot(dynamicstand1, (aes(year)))+
  ggtitle(paste("HEIGHT at RU=", myru))+
  ylab("HEIGHT mean +- sd")+
  geom_ribbon(aes(ymin = height_p5, ymax = height_p95), fill = "yellow") +
  geom_line(aes( y=height_mean), size=1.3)+
  geom_line(aes( y=height_mean+height_sd), size=1, lty=3)+
  geom_line(aes( y=height_mean-height_sd), size=1, lty=3)+
  facet_wrap(~species)+
  theme_bw() 

for (nn in 1:number.of.activites){
  g.height<-g.height+geom_vline(xintercept =abestand.removal1$year[nn], col="limegreen", size=0.5,lty=2)+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=25, label=abestand.removal1$activity[nn], color="red", angle=90)
}

print(g.age)
print(g.dbh)
print(g.height)




cols=c("fasy"="#33CC33", "piab"="#006600", "quro"="#FF7F00", "qupe"="#FF9900", "qupu"="#CC9900", "abal"="#003300", "acca"="#F3F781", "acpl"="#86B404", "acps"="#58FAD0", "algl"="#61210B", "alin"="#A4A4A4", "alvi"="#0B3B17", "bepe"="#2E64FE", "cabe"="#F7BE81", "casa"="#A9F5A9", "coav"="#58D3F7", "frex"="#FF0000", "lade"="#8A4B08",  "pice"="#FFB90F", "pini"="#610B21", "pisy"="#B18904", "poni"="#000000", "potr"="#610B5E","saca"="#F5ECCE", "soar"="#E6E0F8", "soau"="#B40404", "tico"="#9F81F7", "tipl"="#8000FF", "ulgl"="#DF7401" )

new_order_gg=c("ulgl", "tipl", "tico", "soau", "soar", "saca", "potr", "poni", "pisy", "pini", "pice", "lade", "frex", "coav", "casa","cabe", "bepe", "alvi", "alin", "algl", "acps", "acpl", "acca", "abal","qupu", "qupe","quro", "piab", "fasy")

abestand.detail1$species <- factor(abestand.detail1$species, levels=new_order_gg)
g1<-ggplot(abestand.detail1, aes(x=year, y=basalarea, fill=species)) +
  geom_area(show.legend=F) +
  scale_fill_manual(values=cols, guide=guide_legend(reverse=TRUE))+
  labs(y="basal area [m²/ha]") +
  ggtitle(paste0("Basal area at stand=", mystand))+
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(), 
        axis.line = element_line(colour = "black"),
        plot.title = element_text(hjust = 0.5, size=12, face="bold", vjust=1)) +
  scale_x_continuous(expand = c(0.0, 0.0)) +

  theme(plot.background=element_rect(colour=NA))

for (nn in 1:number.of.activites){
  g1<-g1+geom_vline(xintercept =abestand.removal1$year[nn])+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=50, label=abestand.removal1$activity[nn], color="red", angle=90)
}

abestand.detail1.smalls<-data.frame(abestand.detail1 %>% filter(relBasalarea<0.2))
  
g2<-ggplot(abestand.detail1.smalls, aes(x=year, y=basalarea, fill=species)) +
  geom_area(show.legend=F) +
  scale_fill_manual(values=cols, guide=guide_legend(reverse=TRUE))+
  labs(y="basal area [m²/ha]") +
  ggtitle(paste0("Basal area of species less than 20% at stand=", mystand))+
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(), 
        axis.line = element_line(colour = "black"),
        plot.title = element_text(hjust = 0.5, size=12, face="bold", vjust=1)) +
  scale_x_continuous(expand = c(0.0, 0.0)) +

  theme(plot.background=element_rect(colour=NA))

for (nn in 1:number.of.activites){
g2<-g2+geom_vline(xintercept =abestand.removal1$year[nn])+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=10, label=abestand.removal1$activity[nn], color="red", angle=90)
  }


g3<-ggplot(sapling1, aes(x=year, y=count_ha+count_small_ha , fill=species)) +
  geom_area(show.legend=F) +
  scale_fill_manual(values=cols, guide=guide_legend(reverse=TRUE))+
  labs(y="number of represented individuals per ha") +
  ggtitle(paste0("Number of small trees at RU=", myru))+
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(), 
        axis.line = element_line(colour = "black"),
        plot.title = element_text(hjust = 0.5, size=12, face="bold", vjust=1)) +
  scale_x_continuous(expand = c(0.0, 0.0)) +
  theme(plot.background=element_rect(colour=NA))

for (nn in 1:number.of.activites){
  g3<-g3+geom_vline(xintercept =abestand.removal1$year[nn])+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=30000, label=abestand.removal1$activity[nn], color="red", angle=90)
}



initial.species<- sapling1$species[which(sapling1$year==0)]
sapling1.smalls<-data.frame(sapling1 %>% filter(species!=initial.species[1]&species!=initial.species[2]))

g4<-ggplot(sapling1.smalls, aes(x=year, y=count_ha+count_small_ha , fill=species)) +
  geom_area() +
  scale_fill_manual(values=cols, guide=guide_legend(reverse=F))+
  labs(y="number of represented individuals per ha") +
  
  ggtitle(paste0("Number of small trees without the 2 inital species RU=", myru))+
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(), 
        axis.line = element_line(colour = "black"),
        legend.position = c(0.5, -0.8),
        legend.direction = "horizontal",
        plot.title = element_text(hjust = 0.5, size=12, face="bold", vjust=1)) +
  scale_x_continuous(expand = c(0.0, 0.0)) +
  theme(plot.background=element_rect(colour=NA))

for (nn in 1:number.of.activites){
  g4<-g4+geom_vline(xintercept =abestand.removal1$year[nn])+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=9000, label=abestand.removal1$activity[nn], color="red", angle=90)
}


g5<-ggplot(stand1, aes(x=year, y=volume_m3   , fill=species)) +
  geom_area(show.legend=F) +
  scale_fill_manual(values=cols, guide=guide_legend(reverse=TRUE))+
  labs(y="Volume") +
  ggtitle(paste0("Volume at RU=", myru))+
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(), 
        axis.line = element_line(colour = "black"),

        plot.title = element_text(hjust = 0.5, size=12, face="bold", vjust=1)) +
  scale_x_continuous(expand = c(0.0, 0.0)) +

  theme(plot.background=element_rect(colour=NA))

for (nn in 1:number.of.activites){
  g5<-g5+geom_vline(xintercept =abestand.removal1$year[nn])+annotate(geom="text", x=0.95*abestand.removal1$year[nn], y=420, label=abestand.removal1$activity[nn], color="red", angle=90)
}


library(cowplot)
p2 = align_plots(g1,g2,g3,g4,g5, align = "hv")    # this cowplot can align the plots nicely below each other to have xaxes at the same place

grid.arrange(p2[[1]],p2[[2]],p2[[3]],p2[[4]], p2[[5]],nrow=3)   #this make the plot into the pdf

dev.off() # this closes the pdf
}
